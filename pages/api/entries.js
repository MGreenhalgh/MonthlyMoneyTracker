import { entries } from "../../entry";
import fs from "fs"

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(entries);
      break;
    case "POST":
      const { id, out, category, subCategory, date, value, note } = req.body;
      let newEntry = {
        id: id,
        out: out,
        category: category,
        subCategory: subCategory,
        date: date,
        value: value,
        note: note
      }
      entries.push(newEntry);
      //fs.writeFile("../../entry.js", JSON.stringify(newEntry), (err) => console.log(err))
      res.status(200).json(entries);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}