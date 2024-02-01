import { body } from 'express-validator'

export const weatherModifyValidator = () =>{
    return [
        body("date").isLength().isDate().escape(),
        body("tmax").isLength({max:2}).escape(),
        body("tmin").isLength({max:2}).escape(),
        body("tavg").isLength({max:2}).escape(),
        body("departure").isLength().escape(),
        body("HDD").isLength({max:2}).escape(),
        body("CDD").isLength({max:2}).escape(),
        body("precipitation").isLength({max:1}).escape(),
        body("new_snow").isLength({max:1}).escape(),
        body("snow_depth").isLength({max:1}).escape()
    ]
}