import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  getData(id: string) {
    return this.http.get(`http://localhost:3000/api.php/courses/${id}`);
  }
}

@Component({
  selector: 'app-course-videos',
  templateUrl: './course-videos.component.html',
  styleUrls: ['./course-videos.component.scss'],
  providers: [DataService],
})
export class CourseVideosComponent {

  courses: any[] = []; // Initialize courses as an empty array
  videoDetails = { // Initialize videoDetails as an object with empty arrays
    content: [],
    links: [],
    files: []
  };
  constructor( private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.dataService.getData(id).subscribe((data: any) => {


interface ContentItem {
  lname: string;
  duration: string;
  id:string;
}

interface LinkItem {
  lname: string;
  url: string;
  id:string;
}

interface FileItem {
  lname: string;
  url: string;
  id:string;
}
        this.courses = data; // Assuming data is an array of courses
        const course = data[0];
        // Assuming course has properties content, links, and files which are arrays
        this.videoDetails.content = course.content;
        this.videoDetails.links = course.links;
        this.videoDetails.files = course.files;
      });
    } else {
      // Handle the case when id is null
    }
  }
  video ='' };

