import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js"
import EventRouter from "./src/controllers/event-controller.js"
import TagRouter from "./src/controllers/tag-controller.js"
import Event_CategoriesRouter from "./src/controllers/event_categories-controller.js"
import Event_LocationsRouter from "./src/controllers/event_locations-controller.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/provinces', ProvinceRouter);
app.use('/api/event', EventRouter);
app.use('/api/tag', TagRouter)
app.use('/api/categories', Event_CategoriesRouter)
app.use('/api/eventlocations', Event_LocationsRouter)

app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
})