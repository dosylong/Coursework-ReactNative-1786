const prisma = require('../models/prisma');

class RentalController {
  createForm = async (req, res, next) => {
    try {
      //Check form address is exist or not
      const formAddressExist = await prisma.rental.findUnique({
        where: {
          address: req.body.address,
        },
      });
      if (formAddressExist) {
        return res.json({ message: 'Address field already exists!' });
      }

      const createForm = await prisma.rental.create({
        data: {
          address: req.body.address,
          bedroom: req.body.bedroom,
          furniture: req.body.furniture,
          note: req.body.note,
          pickDate: new Date(req.body.pickDate),
          property: req.body.property,
          rentalPrice: Number(req.body.rentalPrice),
          reporterName: req.body.reporterName,

          detailNote: {
            create: { bedroom: '', property: '', furniture: '' },
          },
        },
      });
      return res.json({ ...createForm, message: 'Form created!' });
    } catch (error) {
      return next(error);
    }
  };

  getAllForm = async (req, res, next) => {
    try {
      const getAllFormInDb = await prisma.rental.findMany({
        include: {
          detailNote: true,
        },
      });
      return res.json(getAllFormInDb);
    } catch (error) {
      return next(error);
    }
  };

  deleteForm = async (req, res, next) => {
    try {
      const deleteFormInDb = await prisma.rental.delete({
        where: {
          id: req.body.id,
        },
      });
      return res.json({ ...deleteFormInDb, message: 'Form deleted!' });
    } catch (error) {
      return next(error);
    }
  };

  searchForm = async (req, res, next) => {
    try {
      const searchFormInDb = await prisma.rental.findMany({
        where: {
          address: {
            contains: req.query.address,
            mode: 'insensitive',
          },
        },
      });
      return res.json(searchFormInDb);
    } catch (error) {
      return next(error);
    }
  };

  createDetailNote = async (req, res, next) => {
    try {
      const createDetailNote = await prisma.detailNote.update({
        where: {
          detailNoteId: String(req.query.detailNoteId),
        },
        data: {
          property: req.body.property,
          bedroom: req.body.bedroom,
          furniture: req.body.furniture,
        },
      });
      return res.json({ ...createDetailNote, message: 'Detail note added!' });
    } catch (error) {
      return next(error);
    }
  };

  getDetailNote = async (req, res, next) => {
    try {
      const getDetailNoteInDb = await prisma.detailNote.findMany({
        where: {
          id: req.body.id,
        },
      });
      return res.json(getDetailNoteInDb);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RentalController();
