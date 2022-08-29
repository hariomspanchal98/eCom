import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  tempToken: any;

  constructor(private _Activatedroute: ActivatedRoute, private router: Router, private service: HttpService) { }

  id: any;
  user: any;

  ngOnInit(): void {

    this.tempToken = (localStorage.getItem('token'));

    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.service.get('users/' + this.id).subscribe((data: any) => {
      // console.log(data);
      this.user = data;
      // console.log(this.user);
    })
  }
}
