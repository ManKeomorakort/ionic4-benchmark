import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Platform, NavController } from "@ionic/angular";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker } from "@ionic-native/google-maps/ngx";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('map') element: ElementRef;
  map: GoogleMap;
  
  constructor(public googleMaps: GoogleMaps, public platform: Platform,
    public nav: NavController) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.initMap();
  }

  ionViewDidEnter() {
    console.log("call ionViewDidLoad");
    this.platform.ready().then(() => {
      this.initMap();
    });
  }


  initMap() {
    //this.map = GoogleMaps.create("map_canvas");
    this.map = GoogleMaps.create(this.element.nativeElement);

    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      let coordinates: LatLng = new LatLng(36.06731743465648, -79.79521393775941);
      let position = {
        target: coordinates,
        zoom: 17
      };
    this.map.animateCamera(position);
      let markerOptions: MarkerOptions = {
        position: coordinates,
        //icon: "../../assets/images/icons8-Marker-64.png",
        title: 'Greensboro, NC'
      };
      const marker = this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
    })
  }
}
