import { Component } from '@angular/core';
import { NewUser } from '../models/new-user';
import { AuthService } from '../service/auth.service';
import { Observer } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-new-professor',
  templateUrl: './new-professor.component.html',
  styleUrls: ['./new-professor.component.css']
})
export class NewProfessorComponent {

  newUser!: NewUser;
  userName!: string;
  email!: string;
  password!: string;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger == 'popstate') {
          this.goBack();
        }
      }
    });
  }

  onRegister() {

    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const roles: string[] = ['professor'];

    this.newUser = new NewUser(this.userName, this.email, this.password, roles);
    const observer: Observer<any> = {
      next: () => {
      },
      error: (err) => {
        console.error('Error al crear la cuenta:', err);
        this.isSubmitting = false;
      },
      complete: () => {
        alert('Usuario creado correctamente');
        this.isSubmitting = false;
        this.router.navigate(['/usuarios']);
      }
    };

    this.authService.new(this.newUser).subscribe(observer);
  }

  goBack() {
    this.router.navigate(['/usuarios']);
  }
}
