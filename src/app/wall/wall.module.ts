import { ComponentsModule } from './../shared/components/components.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { WallRoutingModule } from './wall-routing.module';
import { WallComponent } from './wall.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WallComponent],
  imports: [
    CommonModule,
    WallRoutingModule,
    NzCardModule,
    NzAvatarModule,
    NzSpinModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    ComponentsModule,
  ],
})
export class WallModule {}
