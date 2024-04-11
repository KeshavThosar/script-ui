import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip';

import {FormsModule} from '@angular/forms';
import * as yaml from 'js-yaml';
import { ScriptUiConfigObject, ScriptUiConfigStoreItem } from '../data-types';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatIconModule, MatButtonModule, MatDividerModule, MatExpansionModule, MatGridListModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  configName: string = 'Untitled Config'
  yamlConfig: string = 
`title: This is your menu title
desc: This is a description
inputs:
  - name: var1
    type: text
  - name: var2
    type: number
    value: 10
cmd: script.exe --input \${var1} --count \${var2}
  `
  resetYamlConfigTemplate: string = String(this.yamlConfig)

  scriptUiConfig: ScriptUiConfigObject = yaml.load(this.yamlConfig) as ScriptUiConfigObject
  newFile: boolean = true
  docName: string = 'new'
  popupStatus: string = 'hide'
  popupMessage: string = 'Config saved successfully'
  
  constructor(private firestore: FirestoreService, private auth: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    
    this.docName = activatedRoute.snapshot.params['doc']
    this.newFile = (this.docName == 'new')
    
    
    


    auth.authState$.subscribe((aUser: User | null) => {
      if(aUser) {
        try {
          if(!this.newFile) {
            this.firestore.getConfigStoreItem(this.docName).then((result : DocumentSnapshot) => {
              console.warn(result.data())
              let documentData = result.data() 
              if(documentData) {
                this.configName = documentData['name']
                this.yamlConfig = documentData['yamlConfig']
                this.validateScriptUiConfig(yaml.load(this.yamlConfig))
              }
            })
          }
        } catch (error) {
          router.navigate(['/editor/new'])
        }
        
      }
    })
  }
  
  loadScriptUiConfig(data: any){
    try {
      this.yamlConfig = data
      let doc = yaml.load(data)
      // console.warn(doc)
      this.validateScriptUiConfig(doc)

    } catch (error) {
      // console.warn(error)
    }
  }

  validateScriptUiConfig(data: any){
    if(data) {
      if(data.title) { this.scriptUiConfig.title = data.title }
      if(data.desc) { this.scriptUiConfig.desc = data.desc }
      if(data.inputs) { this.scriptUiConfig.inputs = data.inputs }
      // if(data.variables) { this.uiConfig.variables = data.variables }
      if(data.cmd) { this.scriptUiConfig.cmd = data.cmd }
    }
  } 
  showPopup(message: string) {
    this.popupMessage = message
    this.popupStatus = 'show'
    setTimeout(() => this.popupStatus = 'hide', 2000)

  }
  saveConfig() {
    this.auth.authState$.subscribe((aUser: User | null) => {
      if(aUser) {
        try {

          let data = {
            name: this.configName,
            authorUid: aUser.uid,
            desc: this.scriptUiConfig.desc,
            title: this.scriptUiConfig.title,
            yamlConfig: this.yamlConfig
          }
          // console.warn(data)
          if(this.newFile){
            this.firestore.addConfigStoreItem(data).then((res: DocumentReference) => {
              this.router.navigate(['/editor/' + res.id])
            })
          }else {
            this.firestore.updateConfigStoreItem(this.docName, data)
          }
          this.showPopup('Config saved successfully')
        }catch(error) {
          console.warn(error)
        }
      }
    })
  }

  resetConfig() {
    this.yamlConfig = this.resetYamlConfigTemplate
    this.validateScriptUiConfig(yaml.load(this.yamlConfig))

    this.showPopup('Config has been reset')
  }

}
