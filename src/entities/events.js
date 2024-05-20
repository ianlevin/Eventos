class Event{
    id;
    name;
    description;
    id_event_category;
    id_event_location;
    start_date;
    duration_in_minutes;
    price;
    enabled_for_enrollment;
    max_assistance;
    id_creator_user;

    constructor(ID, NAME, DESCRIPTION, CATEGORY, ID_EVENT_LOCATION, START_DATE, DURATION_IN_MINUTES, PRICE, ENABLED_FOR_ENROLLMENT, MAX_ASISTANCE, ID_CREATOR_USER){
        this.id = ID
        this.name = NAME
        this.description = DESCRIPTION
        this.id_event_category = CATEGORY
        this.id_event_location = ID_EVENT_LOCATION
        this.start_date = START_DATE
        this.duration_in_minutes = DURATION_IN_MINUTES
        this.price = PRICE
        this.enabled_for_enrollment = ENABLED_FOR_ENROLLMENT
        this.max_assistance = MAX_ASISTANCE
        this.id_creator_user = ID_CREATOR_USER
    }
}
export default Event;