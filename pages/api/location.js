// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (!req.headers.cookie) {
        return res.end(JSON.stringify(
            { location: { x: 1, y: 1 } }
        ));
    }
    const params = req.headers.cookie.replace(" ", "").split(";");
    const locationParam = params.find((param) => param.startsWith("location="))
    let [rawy, rawx] = locationParam.split("=")[1].split(":");
    let y = parseInt(rawy), x = parseInt(rawx);
    res.status(200).json({ location: { x, y } })
}
