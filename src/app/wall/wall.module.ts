import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { ComponentsModule } from './../shared/components/components.module';
import { WallRoutingModule } from './wall-routing.module';
import { WallComponent } from './wall.component';

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
    NzInputModule,
    NzDrawerModule,
    NzButtonModule,
  ],
})
export class WallModule {}
