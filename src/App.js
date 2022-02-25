import React from 'react';
import { Input, Button, Select, Radio, message } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: "",
      type: "1",
      lng: "36.8233",
      lat: "-1.2884",
      lngt: "36.8233",
      latt: "-1.2884",
    }

  }

  // detect whether the user has logged in
  componentWillMount() {

  }



  render() {
    const {type,lng,lat,zipCode,mapkey,latt,lngt} = this.state;
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    return (
      <div className='home-container' style={{ height: "100%", boxSizing: 'border-box' }}>
        <div style={{ fontSize: 20 }}>
          <div>
            <Radio.Group style={{ margin: 10 }} onChange={(e) => {
              console.log("e===",e);
              this.setState({
                type: e.target.value
              })
            }} value={type} defaultValue={type}>
              <Radio.Button value="1">Position</Radio.Button>
              <Radio.Button value="2">ZipCode</Radio.Button>
            </Radio.Group>
            {type === "1" ? <>
              <input value={latt} placeholder="lat" onChange={(e)=>{
                this.setState({
                  latt:e.target.value
                })
              }}></input>
              <input value={lngt} placeholder="lng" onChange={(e)=>{
                this.setState({
                  lngt:e.target.value
                })
              }}></input></> : <input value={zipCode} placeholder="zipcode"></input>}

              <Button type="primary" onClick={(e)=>{
                this.setState({
                  mapkey:mapkey+1,
                  lat:latt,
                  lng:lngt,
                })
              }}>confirm</Button>
          </div>

          <div style={{ position: "relative", width: 800, height: 500 }}>
            <Map
              google={this.props.google}
              zoom={14}
              key={mapkey}
              style={mapStyles}
              initialCenter={{
                lat:lat,
                lng: lng
              }}
            >
              <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={'SOMA'}
                position={{lat: lat, lng: lng}} />
            </Map>
          </div>
        </div>
      </div>
    )

  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBxzEsUs6BFw9GsLkkSMj1OpirjlfyvEtc'
})(NoteList);
