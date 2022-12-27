// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
import cookie from 'cookie';

export default function handler(req, res) {
    const parsedCookie = cookie.parse(req.headers.cookie);

    if (!parsedCookie || !parsedCookie.location) {
        return res.end(JSON.stringify(
            { location: { x: 1, y: 1 } }
        ));
    }
    const params = parsedCookie.location.split(";");
    const locationParam = params.find((param) => param.startsWith("location="))
    let [rawy, rawx] = locationParam.split("=")[1].split(":");
    let y = parseInt(rawy), x = parseInt(rawx);
    res.status(200).json({ location: { x, y } })
}
