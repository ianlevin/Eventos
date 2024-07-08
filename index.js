import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js"
import EventRouter from "./src/controllers/event-controller.js"
import TagRouter from "./src/controllers/tag-controller.js"
import Event_CategoriesRouter from "./src/controllers/event_categories-controller.js"
import Event_LocationsRouter from "./src/controllers/event_locations-controller.js"
import Event_TagsRouter from "./src/controllers/event_tags-controller.js"
import UserRouter from './src/controllers/user-controller.js'
import LocationRouter from './src/controllers/locations-controller.js'


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/province', ProvinceRouter);
app.use('/api/event', EventRouter);
app.use('/api/tag', TagRouter)
app.use('/api/event-category', Event_CategoriesRouter)

app.use('/api/event-location', Event_LocationsRouter)
app.use('/api/eventtags', Event_TagsRouter)
app.use('/api/user', UserRouter)
app.use('/api/location', LocationRouter)

app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
})