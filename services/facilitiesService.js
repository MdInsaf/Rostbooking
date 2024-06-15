const { rejects } = require('assert');
const db = require('../config/database');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

exports.getAllFacilities = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Facilities', (err, results) => {
      if (err) {
        console.error('Error getting facilities: ', err);
        reject('Error getting facilities');
        return;
      }
      resolve(results);
    });
  });
};

exports.createFacility = async (facilityData, iconImageData) => {
  const { Name, SortNo, CreatedBy, Status } = facilityData;

  try {
    let iconImagePath = null;
    if (iconImageData) {
      iconImagePath = path.join(__dirname, '..', process.env.ICON_IMAGE_UPLOAD_DIR, `${Date.now()}_iconImage.jpg`);
      fs.writeFileSync(iconImagePath, iconImageData);
    }
        
    const query = 'INSERT INTO Facilities (Name, IconImage, SortNo, CreatedBy, Status) VALUES (?, ?, ?, ?, ?)';
    const values = [Name, iconImagePath, SortNo, CreatedBy, Status];

    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    const createdFacility = {
      Name,
      IconImage: iconImagePath,
      SortNo,
      CreatedBy,
      Status
    };

    return createdFacility;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

exports.updateFacility = async (id, facilityData, iconImageData) => {
  const { Name, SortNo, CreatedBy, Status } = facilityData;
  
  try {
    let iconImagePath = null;
    if (iconImageData) {
      iconImagePath = path.join(__dirname, '..', process.env.ICON_IMAGE_UPLOAD_DIR, `${Date.now()}_iconImage.jpg`);
      fs.writeFileSync(iconImagePath, iconImageData);
    }

    const query = iconImageData 
      ? 'UPDATE Facilities SET Name=?, IconImage=?, SortNo=?, CreatedBy=?, Status=? WHERE id=?'
      : 'UPDATE Facilities SET Name=?, SortNo=?, CreatedBy=?, Status=? WHERE id=?';
    const values = iconImageData 
      ? [Name, iconImagePath, SortNo, CreatedBy, Status, id]
      : [Name, SortNo, CreatedBy, Status, id];

    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    const updatedFacility = await this.getFacilityById(id);
    return updatedFacility;
  } catch (error) {
    console.error(`Error updating facility with id ${id}:`, error);
    throw error;
  }
};

exports.deleteFacility = async (id) => {
  try {
    await new Promise((resolve, reject) => {
      db.query('DELETE FROM Facilities WHERE id=?', [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error(`Error deleting facility with id ${id}:`, error);
    throw error;
  }
};

exports.getFacilityById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Facilities WHERE id=?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};


