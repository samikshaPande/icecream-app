import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  categoryList = [
    {
      "name": "Gelato",
      "subcategory": [
        {
          name: "milk",
          value: ""
        },        
        {
          name: "flavours",
          value: []
        }
      ]
    }, {
      "name": "Cream Ice cream",
      "subcategory": [
        {
          name: "cream",
          value: "70%"
        },
        {
          name: "flavours",
          value: []
        }
      ]
    }, {
      "name": "Water Ice cream",
      "subcategory": [       
        {
          name: "flavours",
          value: []
        }
      ]
    }, {
      "name": "Fruit Ice cream",
      "subcategory": [
        {
          name: "fruit_content",
          value: ""
        },
        {
          name: "fruits",
          value: []
        }
      ]
    },{
      "name": "Kulfi",
      "subcategory": [
        {
          name: "milk",
          value: ""
        },
        {
          name: "flavours",
          value: []
        }
      ]
    },

  ]
}
