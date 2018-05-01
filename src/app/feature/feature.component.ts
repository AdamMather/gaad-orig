import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { Global } from './../core/global.model';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})

export class FeatureComponent implements OnInit {

  public waistData: any;
  public lengthData: any;
  public colourData: any;

  public waistValue: string;
  public lengthValue: string;
  public colourValue: string;

  public vehicles: any;
  public isSelected = false;

  matchAll: Promise<string> | null = null;

  private resolve: Function | null = null;

  public canvas: HTMLCanvasElement;


  constructor(
    private router: Router,
    private global: Global,
  ) {
    this.reset();
  }

  reset(): void {
    this.matchAll = new Promise<string>((resolve, reject) => { this.resolve = resolve; });
  }

  ngOnInit(): void {

    this.global.path = this.router.url;

    // get product metadata
    this.waistData = [24, 25, 26, 27, 28, 29, 30, 31];
    this.lengthData = [28, 30, 32, 34];
    this.colourData = ['Blue', 'Black'];

    let ctx = this.draw2dCanvas('goodCanvas1');

    //
    ctx = this.drawCircle(ctx);
    ctx = this.drawRectangle(ctx);
    ctx = this.drawTriangle(ctx);

    //
    this.setVehicles();
  }

  setVehicles(): void {
    this.vehicles = [
      { 'type': 'car', 'make': 'Jaguar' },
      { 'type': 'car', 'make': 'Landrover' },
      { 'type': 'car', 'make': 'Mini' }
    ]
  }

  checkAll(): void {
    this.resolve!(this.isSelected = !this.isSelected);
  }

  selVehicle(): void {
    //console.log('you checked ' + );
  }

  draw2dCanvas(eleId: string): CanvasRenderingContext2D {
    this.canvas = <HTMLCanvasElement>document.getElementById(eleId);
    return this.canvas.getContext('2d');
  }

  fillRectangle(context: CanvasRenderingContext2D): CanvasRenderingContext2D {

    context.fillStyle = "red";
    context.fillRect(0, 0, 80, 40);
    context.strokeRect(0, 0, 80, 40);

    return context;
  }

  drawTriangle(context: CanvasRenderingContext2D): CanvasRenderingContext2D {

    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(100, 75);
    context.lineTo(100, 25);
    context.fillStyle = "#ff3300";
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();

    return context;
  }

  drawCircle(context: CanvasRenderingContext2D): CanvasRenderingContext2D {

    let centerX = this.canvas.width / 4;
    let centerY = this.canvas.height / 4;
    let radius = 30;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#cccc00';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();

    return context;
  }

  drawRectangle(context: CanvasRenderingContext2D): CanvasRenderingContext2D {

    context.beginPath();
    context.moveTo(50, 200);
    context.lineTo(200, 200);
    context.lineTo(200, 50);
    context.lineTo(50, 50);

    context.fillStyle = '#cc99ff';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();

    return context;
  }

}
