const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SourcingTeamService {
  static async validateSourcingUnitExists(sourcingUnitId) {
    if (!sourcingUnitId) return true; // Skip validation if not provided
    
    const sourcingUnit = await prisma.sourcingUnit.findFirst({
      where: { SourcingUnitId: sourcingUnitId }
    });
    return !!sourcingUnit;
  }

  static async getAllSourcingTeams() {
    return await prisma.sourcingTeam.findMany();
  }

  static async getSourcingTeamById(sourcingTeamId) {
    return await prisma.sourcingTeam.findUnique({
      where: { SourcingTeamId: sourcingTeamId }
    });
  }

  static async createSourcingTeam(data) {
    // Validate SourcingUnit exists if provided
    if (data.sourcingUnitId) {
      const sourcingUnitExists = await this.validateSourcingUnitExists(data.sourcingUnitId);
      if (!sourcingUnitExists) {
        throw new Error('Sourcing Unit ID does not exist');
      }
    }

    // Check if SourcingTeamId already exists
    const existingTeam = await prisma.sourcingTeam.findUnique({
      where: { SourcingTeamId: data.SourcingTeamId }
    });

    if (existingTeam) {
      throw new Error('Sourcing Team ID already exists');
    }

    // Check for existing SourcingUnitId assignment
    if (data.sourcingUnitId) {
      const existingAssignment = await prisma.sourcingTeam.findFirst({
        where: { sourcingUnitId: data.sourcingUnitId }
      });

      if (existingAssignment) {
        throw new Error('Sourcing Unit ID is already assigned to another team');
      }
    }

    return await prisma.sourcingTeam.create({
      data: {
        SourcingTeamId: data.SourcingTeamId,
        SourcingTeamName: data.SourcingTeamName,
        TeamType: data.TeamType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        CountryCode: data.CountryCode,
        PinCode: data.PinCode,
        PhoneNumber: data.PhoneNumber,
        LandlineNumber: data.LandlineNumber,
        Email: data.Email,
        sourcingUnitId: data.sourcingUnitId || null
      }
    });
  }

  static async updateSourcingTeamById(sourcingTeamId, data) {
    // Prevent updating SourcingTeamId
    if (data.SourcingTeamId) {
      throw new Error('Sourcing Team ID cannot be changed');
    }

    // Validate SourcingUnit exists if provided
    if (data.sourcingUnitId) {
      const sourcingUnitExists = await this.validateSourcingUnitExists(data.sourcingUnitId);
      if (!sourcingUnitExists) {
        throw new Error('Sourcing Unit ID does not exist');
      }

      // Check if SourcingUnitId is already assigned to another team
      const existingAssignment = await prisma.sourcingTeam.findFirst({
        where: {
          NOT: { SourcingTeamId: sourcingTeamId },
          sourcingUnitId: data.sourcingUnitId
        }
      });

      if (existingAssignment) {
        throw new Error('Sourcing Unit ID is already assigned to another team');
      }
    }

    return await prisma.sourcingTeam.update({
      where: { SourcingTeamId: sourcingTeamId },
      data: {
        SourcingTeamName: data.SourcingTeamName,
        TeamType: data.TeamType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        CountryCode: data.CountryCode,
        PinCode: data.PinCode,
        PhoneNumber: data.PhoneNumber,
        LandlineNumber: data.LandlineNumber,
        Email: data.Email,
        sourcingUnitId: data.sourcingUnitId
      }
    });
  }

  static async deleteSourcingTeamById(sourcingTeamId) {
    const existingTeam = await prisma.sourcingTeam.findUnique({
      where: { SourcingTeamId: sourcingTeamId }
    });

    if (!existingTeam) {
      throw new Error('Sourcing Team not found');
    }

    return await prisma.sourcingTeam.delete({
      where: { SourcingTeamId: sourcingTeamId }
    });
  }
}

module.exports = SourcingTeamService;