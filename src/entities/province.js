class Province{
    id;
    name;
    full_name;
    latitude;
    longitude;
    display_order;

    constructor(ID, NAME, FULLNAME, LATITUDE, LONGITUDE, DISPLAYORDER){
        this.id = ID;
        this.name = NAME;
        this.full_name = FULLNAME;
        this.latitude = LATITUDE;
        this.longitude = LONGITUDE;
        this.display_order = DISPLAYORDER;
    }
}
export default Province;