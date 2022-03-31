import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBranch } from 'src/app/Models/ibranch';
import { BranchService } from 'src/app/Services/branch.service';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  formgroup!: FormGroup;
  map: Mapboxgl.Map | null = null;
  lat!: number;
  long!: number;
  branchId!: number;
  branch!: IBranch;

  

  constructor(private route: ActivatedRoute, private branchService: BranchService,private router:Router) { }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.moapboxKey
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 11.15
    });
    this.formgroup = new FormGroup({
      arabicName: new FormControl('', Validators.required),
      englishName: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      long: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    
    this.branchId = Number(this.route.snapshot.paramMap.get('id'));
    this.branchService.GetBranchById(this.branchId).subscribe({
      next: (res: any) => {
        this.branch = res.response;
        this.lat = this.branch.lat;
        this.long = this.branch.long;
        this.map?.setCenter([this.long, this.lat]);
        this.creatMarker(this.long, this.lat);
        console.log(this.branch)
        this.formgroup = new FormGroup({
          arabicName: new FormControl(this.branch.arabicName, Validators.required),
          englishName: new FormControl(this.branch.englishName, Validators.required),
          lat: new FormControl(this.branch.lat, Validators.required),
          long: new FormControl(this.branch.long, Validators.required),
          address: new FormControl(this.branch.address, Validators.required),
        });
      }
    })
  }

  creatMarker(long: number, lat: number) {
    const marker = new Mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([long, lat])
      .addTo(this.map!);

    marker.on('drag', () => {
      this.long = marker.getLngLat().lng;
      this.lat = marker.getLngLat().lat;
      this.formgroup.value.long = Number(marker.getLngLat().lng)
      this.formgroup.value.lat = Number(marker.getLngLat().lat)
    });
  }

  onSubmit() {
    let editedBranch:IBranch = this.formgroup.value;
    editedBranch.id = this.branch.id;
    console.log(editedBranch);
    this.branchService.EditBranch(editedBranch).subscribe({
      next:(res:any)=>{
        if(res.status){
          this.router.navigate(['/Branch']);
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ResetForm(){
    this.router.navigate(['/Branch']);
  }
}
