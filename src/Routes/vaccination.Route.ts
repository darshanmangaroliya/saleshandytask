import { Router } from "express";
import { filltervaccinationdata } from "../app/controllers/Vaccinationdatafiltter.controller";
import { addUservaccinationEntry } from "../app/controllers/Vaccination.controller";

const router = Router();


router.post('/booking', addUservaccinationEntry);
 router.get('/', filltervaccinationdata);

export default router;