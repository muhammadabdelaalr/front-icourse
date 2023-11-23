import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(public auth:AuthService, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      // Get the first course from the API response
      const firstCourse = data[0];
      switch(firstCourse.lang ){
        case '1':
          firstCourse.lang = "انجليزي";
        break;
        case '0':
         firstCourse.lang = "عربي";
          break;
        default:
         firstCourse.lang = "عربي";
          break;
      }
      //TODO: Write a switch case for level ...
      // Populate the 'course' object with the data from the first course
      this.course = firstCourse;
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
