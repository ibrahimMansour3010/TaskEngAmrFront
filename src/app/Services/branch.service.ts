import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBranch } from '../Models/ibranch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpclient:HttpClient) { }

  GetAllBranches():Observable<IBranch[]>{
    return this.httpclient.get<IBranch[]>(environment.URL+"api/Branch/GetAllBranches");
  }
  GetBranchById(id:number){
    return this.httpclient.get<IBranch>(environment.URL+"api/Branch/GetBranchById/"+id);
  }
  AddBranch(branch:IBranch){
    return this.httpclient.post<IBranch>(environment.URL+'api/Branch/AddBranch',branch);
  }
  EditBranch(branch:IBranch){
    return this.httpclient.put<IBranch>(environment.URL+'api/Branch/EditBranch',branch);
  }
  DeleteBranch(id:number){
    return this.httpclient.delete<IBranch>(environment.URL+'api/Branch/DeleteBranch/'+id);
  }
}
