import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';
import { ImageType } from '../image-type';
import { of } from 'rxjs';
import { DestinationService } from '../destination.service';
import { ThemeService } from '../theme.service';
import { ResourceService } from '../resource.service';
import { TripService } from '../trip.service';
import { GlobalDataService } from '../global-data.service';
import { resource } from 'selenium-webdriver/http';
import { Resource } from '../resource';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  imageURI:string;
  imageFileName:string;
  typeSelected:ImageType;
  imageTypes: ImageType[];
  sources:any[];
  selectedSource:any;
  resourceId:any;
  resources:Resource[];
  caption:string;
  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private camera: Camera,
    private file:File,
    private http:HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private globalService:GlobalDataService,
    private resourceService:ResourceService,
    private router:Router,
    private destinationService: DestinationService, private themeService: ThemeService, private tripService: TripService ) {
      this.globalService.setTitle("Resources");
      of(this.getImageType().then(res=>{
        this.imageTypes=res;
      }));

    }

  ngOnInit() {
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  async uploadFile() {
    let loader = await this.loadingCtrl.create();
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://localhost:9090/uploadFile', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
  }

  startUpload() {
    this.file.resolveLocalFilesystemUrl( this.imageURI)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            this.presentToast('Error while reading file.');
        });
}
 
readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('file', imgBlob, file.name);
        formData.append('imageType', this.typeSelected.name);
        formData.append('id',this.resourceId);
        formData.append('caption',this.caption)
        this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
  const loading = await this.loadingCtrl.create({
  });
  await loading.present();

  this.http.post<Resource>(this.globalService.getApiUrl()+"uploadFile", formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe((res)=>{
       
        this.resources.push(res);
        console.log(res);
        this.imageURI=null;
        this.globalService.successToast(this.globalService.getAddSuccessMsg());
      },
      err => {
  
        var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
          this.globalService.failureToast(errMsg);
          console.log(err);
        });;
}

 async getImageType(){
    return this.imageTypes = [{"id":1,"name":"trip"},{"id":2,"name":"theme"},{"id":3,"name":"destination"}]
  }

  onTypeSelect(){
    console.log("on changes");
    this.selectedSource=null;
    this.resources=null;
    this.imageURI=null;
    this.resourceId=null;
    if(this.typeSelected.name=="trip"){
      this.tripService.getTrips().subscribe(res=>{
        this.sources=res;
      })
    
    }else if(this.typeSelected.name=="theme"){
      this.themeService.getThemes().subscribe(res=>{
        this.sources=res;
      })

    }else if (this.typeSelected.name="destination"){
      this.destinationService.getAllDestinations().subscribe(res=>{
        this.sources=res;
      })
    }
  }

  onSourceSelect(){
    console.log(this.typeSelected);
    this.resources=null;
    this.imageURI=null;
    if(this.typeSelected.name=="trip"){
        this.resourceId=this.selectedSource.id;
        this.getResources('trip',this.resourceId);
      }
    else if(this.typeSelected.name=="theme"){
      this.resourceId=this.selectedSource.id;
      this.getResources('theme',this.resourceId);
      }

    else if (this.typeSelected.name="destination"){
      this.resourceId=this.selectedSource.id;
      this.getResources('destination',this.resourceId);
    }
  }

  getResources(resourceType:string,id:number){
    this.resourceService.getResources(resourceType,id).subscribe(
      res=>this.resources=res
    );
  }

  goToResource(resource:Resource){
    this.router.navigate(['resource/'+resource.id]);
  }
}
