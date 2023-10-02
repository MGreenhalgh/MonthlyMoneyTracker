import { entries } from "../../entry";

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(entries);
      break;
    case "POST":
      const { out, category, subCategory, date, value, note } = req.body;
      entries.push({
        id: entries.length + 1,
        out: out,
        category: category,
        subCategory: subCategory,
        date: date,
        value: value,
        note: note
      });
      res.status(200).json(entries);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}