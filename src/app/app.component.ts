import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Typed from 'typed.js';
import emailjs from '@emailjs/browser';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public title = 'portfolio';
  public activeLink = '';
  public isLoading = false;
  @ViewChildren('sections') sections!: QueryList<any>;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    const options = {
      strings: ["Software Developer", "Frontend Developer", "JavaScript Developer", "MEAN Stack Developer", "MERN Stack Developer", "Playwright Developer"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 500,
      loop: true,
    };

    new Typed("#typed-output", options);

    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach((button: Element) => {
      (button as HTMLElement).addEventListener('click', function () {
        const targetId = (this as HTMLElement).getAttribute('aria-controls');
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            (this as HTMLElement).blur();
            const headerOffset = 160; // Adjust this value based on your header height
            const elementPosition = target.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {
    window.onscroll = () => {
      let currentSection = '';
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight) {
        this.activeLink = 'contact';
      } else {
        this.sections.forEach((section) => {
          const sectionTop = section.nativeElement.offsetTop;
          const sectionHeight = section.nativeElement.offsetHeight;
          if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
            currentSection = section.nativeElement.getAttribute('id');
          }
        });
        this.activeLink = currentSection;
      };
    };
  }

  setActiveLink(linkActive: string) {
    console.log(linkActive)
    this.activeLink = linkActive;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      emailjs.send('more.ajay6995', 'template_zip9bs8', this.contactForm.value, 'uY4gXyME1PD6k7mPC')
        .then((response: any) => {
          this.isLoading = false;
          alert('Message sent successfully!');
          this.contactForm.reset();
        })
        .catch((error: any) => {
          this.isLoading = false;
          console.error('Error sending email:', error);
          alert('Failed to send message. Please try again later.');
        });
    }
  }
}