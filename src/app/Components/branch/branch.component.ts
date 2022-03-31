import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IBranch } from 'src/app/Models/ibranch';
import { BranchService } from 'src/app/Services/branch.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnChanges {

  branches: IBranch[] = [];

  constructor(private branchService: BranchService) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  
  deleteBranchId: number = 0;
  ngOnInit(): void {
    this.branchService.GetAllBranches().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.branches = res.response;
        }
      },
      error(err) {
        console.log(err);
      }
    });
  }
  deleteBranch() {
    this.branchService.DeleteBranch(this.deleteBranchId).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.branches = this.branches.filter(i=> i.id!=this.deleteBranchId)
        }
      }
    });
  }
}
