import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../Services/AdminService/admin-service.service';
import { UserData } from '../../../model/User-Data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {

  transaction:any []=[];
  usersArray: UserData[]=[];

  showOverlay: boolean = false;


  constructor(private router: Router, private adminService: AdminService, private http:HttpClient) {}

  ngOnInit(): void {
    this.fetchUser();
    
  }

  // Fetch the list of users from the backend
  fetchUser(): void {
    this.adminService.getUsers().subscribe({
      next: (data:any) => {
        this.usersArray = data;
      },
      error: (err) => {
        console.error('Error while fetching users:', err);
      },
    });
  }

  fetchTransaction(id:number | undefined){

     // Get token from local storage
      const userKey = localStorage.getItem('adminToken');
      let token = null;
     
      token = userKey;

      if (!token) {
        alert("User is not authenticated. Please login again.");
        return;
      }

      // Build headers with Authorization
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

     this.http.get<any>(
        `http://localhost:8080/api/payment/byUser/${id}`,
        {headers}
      )
      .subscribe({
        next: (res) =>{
        this.transaction = res;
        console.log(res);

        this.showOverlay=true;
        },
        error: (er) => {console.log("Error while fetching transaction");}
      });
  }

  // Handle updating the status of users (approve/reject)
  updateStatus(id: number | undefined, status: string): void {
  if (id === undefined) {
    console.error('User ID is undefined');
    return;
  }

  const action = status === 'ACTIVE' ? 'Approve' : 'Reject';
  const confirmMsg = `Are you sure you want to ${action} this user?`;

  if (confirm(confirmMsg)) {
    const request$ =
      status === 'ACTIVE'
        ? this.adminService.approveUser(id)
        : this.adminService.rejectUser(id);

    request$.subscribe({
      next: () => {
        alert(`User ${action}d successfully!`);
        this.fetchUser(); // Reload list
      },
      error: (err) => {
        alert(`Error while trying to ${action.toLowerCase()} user`);
        console.error(err); // Log for debugging
      },
    });
  }
}


  // Helper method to set the status color based on status value
  getStatusColor(status: string | undefined): string {
    if (status === undefined) {
      return 'black'; // Default color for undefined status
    }

    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'green'; // Active users in green
      case 'REJECTED':
        return 'red'; // Rejected users in red
      case 'PENDING':
        return 'orange'; // Pending users in orange
      default:
        return 'black'; // Default color for unrecognized statuses
    }
  }

  // Logout functionality
  navigate(event: Event): void {
    const ac_option = (event.target as HTMLSelectElement).value;
    if (ac_option === 'logout') {
      localStorage.removeItem('adminToken');
      this.router.navigate(['/public-landing']);
    }
  }

  // Image URL to display in the table
  imageURL =
    'https://imgs.search.brave.com/CvAZteVhIRcQ-a75CvT8kMAGTzoq3ULueUbbugOqVdY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkxLzIx/Lzc2LzkxMjE3NjFi/YjI2YTE0ZTMzYjdi/OTdmZjg5MzM1NGQ4/LmpwZw';

  // View image in a new tab
  viewImage(url: string): void {
    window.open(url, '_blank');
  }

  // Approve user based on user id
  approveUser(id: number | undefined): void {
    if (id !== undefined) {
      this.updateStatus(id, 'ACTIVE'); // Set status to ACTIVE for approval
    }
  }

  // Reject user based on user id
  rejectUser(id: number | undefined): void {
    if (id !== undefined) {
      this.updateStatus(id, 'REJECTED'); // Set status to REJECTED for rejection
    }
  }

  cancel(){
    this.showOverlay = false;
  }
}
