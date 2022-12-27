// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
import cookie from 'cookie';

export default function handler(req, res) {

    if (!req.headers.cookie) {
        return res.end(JSON.stringify(
            { location: { x: 1, y: 1 } }
        ));
    }
    const parsedCookie = cookie.parse(req.headers.cookie);
    console.log("parsedCookie: ", parsedCookie);
    console.log("location: ", parsedCookie.location)

    const locationParam = parsedCookie.location;
    let [rawy, rawx] = locationParam.split(":");
    let y = parseInt(rawy), x = parseInt(rawx);
    res.status(200).json({ location: { x, y } })
}
