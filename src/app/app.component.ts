import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'portfolio';

  ngOnInit() {
    const options = {
      strings: ["Software Developer", "Frontend Developer", "JavaScript Developer", "MEAN Stack Developer", "MERN Stack Developer", "Playwright Developer"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 500,
      loop: true,
    };

    new Typed("#typed-output", options);
  }
}