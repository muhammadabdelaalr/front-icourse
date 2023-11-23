import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/api.php/courses');
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
    this.dataService.getData().subscribe((data: any) => {
      // Get the first course from the API response
      interface Course {
        id: string;
        // other properties...
      }
      //const course = data[0];
    
      const course = data.find((item: Course) => item.id === id);
      switch(course.lang ){
        case '1':
          course.lang = "انجليزي";
        break;
        case '0':
         course.lang = "عربي";
          break;
        default:
         course.lang = "عربي";
          break;
      }
      //TODO: Write a switch case for level ...
      // Populate the 'course' object with the data from the first course
      this.course = course;
      // Push the course to the 'recommended' array
      this.recommended.push(this.course);
    });
  }

  addToCart() {
    this.courses.push(this.course);
    this.auth.shopp.next(this.courses);
    setTimeout(() => {
      localStorage.setItem('courses', JSON.stringify(this.courses));
    }, 1000);
  }
}
