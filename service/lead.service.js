const model = require("../helper/db.helper");
const { Op } = require('sequelize');
const Lead = model.lead;

exports.createLead = async (leadData) => {
  return await Lead.create({
    // user_id: leadData.user_id,
    source: leadData.source,
    client: leadData.client,
    // status: leadData.status,
    email: leadData.email,
    contact_number: leadData.contact_number,
    date: leadData.date,
    district: leadData.district,
  });
};

exports.getAllLeads = async () => {
  return await Lead.findAll();
};

exports.getLeadById = async (id) => {
  return await Lead.findByPk(id);
};

exports.updateLead = async (id, updateData) => {
  const lead = await Lead.findByPk(id);
  if (!lead) return null;
  await lead.update(updateData);
  return lead;
};

exports.deleteLead = async (id) => {
  const deleted = await Lead.destroy({ where: { lead_id: id } });
  return deleted;
};

// Filters

exports.unassignedLeads = async () => {
  return await Lead.findAll({
    where: {
      user_id: {
        [Op.is]: null
      }
    },
  });
};

exports.getLeadsByEmpId = async (empId) => {
  return await Lead.findAll({ where: { user_id: empId } });
};

exports.getLeadsBySource = async (source) => {
  return await Lead.findAll({ where: { source: source } });
};

exports.getLeadsByClient = async (client) => {
  return await Lead.findAll({ where: { client: client } });
};

exports.getLeadsByStatus = async (status) => {
  return await Lead.findAll({ where: { status: status } });
};

exports.getLeadsByEmail = async (email) => {
  return await Lead.findAll({ where: { email: email } });
};

exports.getLeadsByContact = async (number) => {
  return await Lead.findAll({ where: { contact_number: number } });
};

exports.getLeadsByDateRange = async (start, end) => {
  return await Lead.findAll({
    where: {
      date: {
        [db.Sequelize.Op.between]: [start, end],
      },
    },
  });
};
