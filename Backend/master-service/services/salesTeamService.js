const prisma = require('../prisma/client');
const { 
  validateSalesTeam,
  validateSalesTeamUpdate 
} = require('../validations/salesTeamValidation');

class SalesTeamService {
  static async createSalesTeam(data) {
    const { error } = validateSalesTeam(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingTeam = await prisma.salesTeam.findUnique({
      where: { salesTeamCode: data.salesTeamCode }
    });

    if (existingTeam) {
      throw new Error('Sales Team Code already exists');
    }

    return prisma.salesTeam.create({
      data
    });
  }

  static async getAllSalesTeams() {
    return prisma.salesTeam.findMany();
  }

  static async getSalesTeamById(id) {
    return prisma.salesTeam.findUnique({
      where: { id: parseInt(id) }
    });
  }

  static async updateSalesTeam(id, data) {
    const existingTeam = await prisma.salesTeam.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingTeam) {
      throw new Error('Sales Team not found');
    }

    const { error } = validateSalesTeamUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.salesTeamCode) {
      delete data.salesTeamCode;
    }

    return prisma.salesTeam.update({
      where: { id: parseInt(id) },
      data
    });
  }

  static async deleteSalesTeam(id) {
    return prisma.salesTeam.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = SalesTeamService;