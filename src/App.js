import React from 'react';
import { Input, Button, Select, Radio} from 'antd';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import "./index.css";
import axios from 'axios';

const moment = require("moment");
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const formRef = React.createRef();
const $ = require("jquery");

var rows = [];

class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      item: null,
      zipCode: "",
      type: "1",
      lng: "36.8233",
      lat: "-1.2884",
      lngt: "36.8233",
      latt: "-1.2884",
      searchValue: '',
      list: [],
      detail: {},
      mapkey: 1
    }

  }

  // detect whether the user has logged in
  componentWillMount() {

  }

  async query() {
    const { type, lng, lat, zipCode, mapkey, latt, lngt } = this.state;
    this.setState({
      item: null
    });
    axios({
      method: 'get',
      url: 'https://data.seattle.gov/resource/kkzf-ntnu.json',
      params: {

      }
    })
      .then((response) => {
        let item = response.data.find((it) => {
          console.log("it", it);
          if (it.address && it.address.indexOf(zipCode) != -1) {
            return it;
          }
        });
        console.log("item====", item);


        this.setState({
          item: item,
          lng: item.longitude, 
          lat: item.latitude
        });
      })

  }

  async handleOk(values) {
    console.log("formRef", formRef);
    formRef.current.submit();

  };

  handleCancel(values) {
    console.log(values);
  };



  render() {
    const { type, lng, lat, zipCode, mapkey, latt, lngt, item } = this.state;
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    const containerStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
    return (
      <div className='home-container' style={{ height: "100%", boxSizing: 'border-box' }}>
        <div style={{ fontSize: 20 }}>
          <div>
            <Radio.Group style={{ margin: 10 }} onChange={(e) => {
              console.log("e===", e);
              this.setState({
                type: e.target.value
              })
            }} value={type} defaultValue={type}>
              <Radio.Button value="1">Position</Radio.Button>
              <Radio.Button value="2">ZipCode</Radio.Button>
            </Radio.Group>
            {type == 1 ? <>
              <input className='input' value={latt} placeholder="lat" onChange={(e) => {
                this.setState({
                  latt: e.target.value
                })
              }}></input>
              <input className='input' value={lngt} placeholder="lng" onChange={(e) => {
                this.setState({
                  lngt: e.target.value
                })
              }}></input></> : <input className='input' value={zipCode} onChange={(e) => {
                this.setState({
                  zipCode: e.target.value
                })
              }} placeholder="zipcode"></input>}

            <Button type="primary" onClick={(e) => {
              if (type == "2") {
                this.query();
                return;
              }
              this.setState({
                mapkey: mapkey + 1,
                lat: latt,
                lng: lngt,
              })
            }}>confirm</Button>
            
          </div>
          {
            item? <div className='info-row'>
            <div>address:{item.address}</div>
            <div>agency:{item.agency}</div>
            <div>latitude:{item.latitude}</div>
            <div>longitude:{item.longitude}</div>
            <div>location:{item.location}</div>
          </div>:""
          }
         
          <div style={{ position: "relative", width: 800, height: 500 }}>
            <Map
              google={this.props.google}
              zoom={14}
              key={mapkey}
              style={mapStyles}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
            >
              <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{ lat: lat, lng: lng }} />
            </Map>
          </div>
        </div>
      </div>
    )
    // } else {
    //   return (
    //     <div>
    //       <h1>Note List</h1>
    //     </div>
    //   )
    // }

  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBxzEsUs6BFw9GsLkkSMj1OpirjlfyvEtc'
})(NoteList);
