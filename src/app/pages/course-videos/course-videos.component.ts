import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/login/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  getData(id: String) {
    return this.http.get(`http://localhost:3000/api.php/courses/${id}`);
  }
}
@Component({
  selector: 'app-course-videos',
  templateUrl: './course-videos.component.html',
  styleUrls: ['./course-videos.component.scss'],
  providers: [DataService],
})
export class CourseVideosComponent implements OnInit {

  videoDetails = [
    {
      id: 1,
      videoName: 'video one',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '1.5m',
      linkName: 'link 1',
      linkUrl: 'https://www.youtube.com/watch?v=bNyUyrR0PHo',
      fileName: 'file 1',
      fileUrl: 'https://www.youtube.com/watch?v=bNyUyrR0PHo'
    },
    {
      id: 2,
      videoName: 'video two',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: '5m',
      linkName: 'link 2',
      linkUrl: 'https://www.youtube.com/watch?v=bNyUyrR0PHo',
      fileName: 'file 1',
      fileUrl: 'https://www.youtube.com/watch?v=bNyUyrR0PHo'
    }
  ]

  curr_video_url: string = this.videoDetails[0].videoUrl;
  curr_video_name: string = this.videoDetails[0].videoName;
  constructor(public auth:AuthService, private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  }

  setId(vid_id: any) {

    for (let video of this.videoDetails) {
      if (video.id === vid_id) {
        this.curr_video_url = video.videoUrl;
        this.curr_video_name = video.videoName;
        break;
      }
  }
  console.log(vid_id);
}
}
