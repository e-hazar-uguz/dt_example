import { Component, OnInit, ViewChild } from '@angular/core';
import { CitiesService } from './cities.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CityModel, DistrictModel } from './cities.model';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [CitiesService],
})
export class CitiesComponent implements OnInit {
  citiesData: any;
  districtData: any;
  title = 'ŞEHİR LİSTESİ';
  cityModel: CityModel = new CityModel();
  districtModel: DistrictModel = new DistrictModel();
  formValue!: FormGroup;
  dataLoaded = false;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private cityService: CitiesService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      info: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: '<lf<t>ip>',
      destroy: true,
      order: [0, 'asc'],
      searching: true,
    };
    this.getAllDistricts();
    this.getAllCitites();
  }

  createForm() {
    this.formValue = this.formBuilder.group({
      id: [''],
      il_id: [''],
      name: [''],
    });
  }

  getAllCitites() {
    this.cityService.getAllCities().subscribe((data) => {
      if (data) {
        //console.log(data);
        this.citiesData = data;
        this.dataLoaded = true;
        this.dtTrigger.next(null);
      }
    });
  }

  getAllDistricts() {
    this.cityService.getAllDistricts().subscribe((data) => {
      if (data) {
        //console.log(data);
        this.districtData = data;
        this.dataLoaded = true;
        this.dtTrigger.next(null);
      }
    });
  }

  getCityName(id: any) {
    let return_text = '';
    if (this.citiesData) {
      this.citiesData.forEach((item: any) => {
        if (item) {
          if (id == item.id) {
            return_text = item ? item.name : '';
          }
        }
      });
    }
    return return_text;
  }

  cancel() {
    let ref = document.getElementById('cancel');
    ref?.click();
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getAllCitites();
    });
  }

  rowControlData: any;
  updateData(row: DistrictModel) {
    this.rowControlData = row;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['il_id'].setValue(row.il_id);
    this.formValue.controls['name'].setValue(row.name);
  }

  tempSavedData: any = [];
  saveChangeDatas(state: number) {
    this.districtModel.id = this.formValue.value.id;
    this.districtModel.il_id = this.formValue.value.il_id;
    this.districtModel.name = this.formValue.value.name;

    if (
      this.rowControlData.id != this.formValue.value.id ||
      this.rowControlData.il_id != this.formValue.value.il_id ||
      this.rowControlData.name != this.formValue.value.name
    ) {
      this.tempSavedData.push({
        id: this.formValue.value.id,
        city_name: this.getCityName(this.formValue.value.il_id),
        name: this.formValue.value.name,
      });
    }
    if (state == 2) {
      this.rerender();
      this.cancel();
      this.formValue.reset();
      this.toastrService.success(
        'Kayıt Başarıyla Güncellendi!' +
          '  ' +
          this.districtModel.id +
          '  ' +
          this.districtModel.name +
          '  ' +
          this.getCityName(this.districtModel.il_id)
      );
    }
  }

  deleteData(info: any) {
    this.toastrService.info('Kayıt Başarıyla Silindi!' + ' ' + info.name);
  }

  saveAllData() {}
}
