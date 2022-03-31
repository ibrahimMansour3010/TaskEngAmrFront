import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { BranchService } from 'src/app/Services/branch.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  map:Mapboxgl.Map|null=null;
  lat:number=30.0778987;
  long:number=31.342715;
  formgroup!:FormGroup ;
  constructor(private branchService:BranchService,private router:Router) { }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.moapboxKey
    this.map = new Mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[31.342715,30.0778987],
    zoom:11.15
    });
    
    this.creatMarker(31.342715,30.0778987);
    this.formgroup = new FormGroup({
      arabicName:new FormControl('',Validators.required),
      englishName:new FormControl('',Validators.required),
      lat:new FormControl(this.lat,Validators.required),
      long:new FormControl(this.long,Validators.required),
      address:new FormControl('',Validators.required),
    })
  }
  creatMarker(long:number,lat:number){
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([long, lat])
      .addTo(this.map!);
              
      marker.on('drag', ()=>{
        this.long=marker.getLngLat().lng;
        this.lat=marker.getLngLat().lat;
        this.formgroup.value.long = Number(marker.getLngLat().lng)
        this.formgroup.value.lat = Number(marker.getLngLat().lat)
      });
  }

  onSubmit(){
    console.log(this.formgroup.value);
    this.branchService.AddBranch(this.formgroup.value).subscribe({
      next:(res:any)=>{
        if(res.status){
          this.router.navigate(['/Branch']);
        }else{
          alert(res.message);
        }
      },
      error:(err)=>{
        alert(err);
      }
    })
  }
  ResetForm(){
    this.router.navigate(['/Branch']);
  }
}