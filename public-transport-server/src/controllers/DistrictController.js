const District = require('../models/District');

// Get all districts
exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().populate('stops');
    res.status(200).json(districts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a district by ID
exports.getDistrictById = async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate('stops');
    if (!district) return res.status(404).json({ message: 'District not found' });
    res.status(200).json(district);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a district
exports.createDistrict = async (req, res) => {
  try {
    const district = new District(req.body);
    const savedDistrict = await district.save();
    res.status(201).json(savedDistrict);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a district
exports.updateDistrict = async (req, res) => {
  try {
    const updatedDistrict = await District.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDistrict) return res.status(404).json({ message: 'District not found' });
    res.status(200).json(updatedDistrict);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a district
exports.deleteDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.id);
    if (!district) return res.status(404).json({ message: 'District not found' });
    await district.deleteOne();
    res.status(200).json({ message: 'District deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDistrictForCity = async (req, res) => {
  try {
    const districtData = {
      ...req.body,
      city_id: req.params.cityId
    };
    const district = new District(districtData);
    await district.save();
    res.status(201).json(district);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addStopToDistrict = async (req, res) => {
  try {
    const district = await District.findById(req.params.districtId);
    if (!district) return res.status(404).json({ message: 'District not found' });

    const stop = new Stop({
      ...req.body,
      city_id: district.city_id
    });
    
    await stop.save();
    district.stops.push(stop._id);
    await district.save();
    res.status(201).json(stop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
