import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  getData(id: String) {
    return this.http.get(`http://localhost:3000/api.php/courses/${id}`);
  }
}

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers: [DataService]
})

export class CourseDetailsComponent implements OnInit {
  panelOpenState = true;
  courseVideo = [
    {
      name: ' الدرس1.1',
      title: 'مقدمة الدورة',
    },
    {
      name: ' الدرس1.2',
      title: 'الدرس الأول',
    },
  ];
  recommended: any = [];
  course: any; // This object will be populated with data from the API
  courses: any = [];

  constructor(public auth:AuthService, private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null){
      this.dataService.getData(id).subscribe((data: any) => {
        this.course = data[0];
        switch(this.course.lang ){
          case '1':
            this.course.lang = "انجليزي";
            break;
          case '0':
            this.course.lang = "عربي";
            break;
          default:
            this.course.lang = "عربي";
            break;
        }
        //TODO: Write a switch case for level ...
    
        // Push the course to the 'recommended' array
        this.recommended.push(this.course);
      });
    }
  }

  addToCart() {
    this.courses.push(this.course);
    this.auth.shopp.next(this.courses);
    setTimeout(() => {
      localStorage.setItem('courses', JSON.stringify(this.courses));
    }, 1000);
  }
}
