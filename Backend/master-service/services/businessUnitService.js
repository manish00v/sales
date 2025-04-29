const prisma = require('../prisma/client');
const { validateBusinessUnit, validateBusinessUnitUpdate } = require('../validations/businessUnitValidation');

class BusinessUnitService {
    static async createBusinessUnit(data) {
        // Validate input data
        const { error } = validateBusinessUnit(data);
        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(', '));
        }

        // Check for duplicate business unit code
        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: data.businessUnitCode }
        });
        if (existingUnit) {
            throw new Error('Business Unit Code already exists');
        }

        // Check Business Entity exists
        const businessEntity = await prisma.businessEntity.findUnique({
            where: { businessEntityCode: data.businessEntityCode }
        });
        if (!businessEntity) {
            throw new Error(`Business Entity with code ${data.businessEntityCode} not found`);
        }

        // Handle Factory Unit if provided
        let factoryUnitId = null;
        if (data.factoryUnitCode) {
            const factoryUnit = await prisma.factoryUnit.findUnique({
                where: { factoryUnitCode: data.factoryUnitCode }
            });
            if (!factoryUnit) {
                throw new Error(`Factory Unit with code ${data.factoryUnitCode} not found`);
            }
            factoryUnitId = factoryUnit.id;
        }

        // Handle Sales relationships if provided
        let salesChannelId = null, salesOfficeId = null;
        if (data.salesChannelId || data.salesChannelCode || data.salesOfficeCode) {
            // Validate sales channel
            if (!data.salesChannelId && !data.salesChannelCode) {
                throw new Error('Either salesChannelId or salesChannelCode must be provided');
            }

            const salesChannelWhere = data.salesChannelId 
                ? { id: parseInt(data.salesChannelId) }
                : { salesChannelId: data.salesChannelCode };

            const salesChannel = await prisma.salesChannel.findUnique({
                where: salesChannelWhere
            });
            
            if (!salesChannel) {
                throw new Error(
                    data.salesChannelId 
                        ? `Sales Channel with ID ${data.salesChannelId} not found`
                        : `Sales Channel with code ${data.salesChannelCode} not found`
                );
            }

            // Validate sales office
            if (!data.salesOfficeCode) {
                throw new Error('salesOfficeCode is required for sales relationships');
            }

            const salesOffice = await prisma.salesOffice.findUnique({
                where: { salesOfficeCode: data.salesOfficeCode }
            });

            if (!salesOffice) {
                throw new Error(`Sales Office with code ${data.salesOfficeCode} not found`);
            }

            salesChannelId = salesChannel.id;
            salesOfficeId = salesOffice.id;
        }

        // Final validation to ensure either factory or sales relationship exists
        if (!factoryUnitId && !(salesChannelId && salesOfficeId)) {
            throw new Error('Business Unit must have either a Factory Unit OR both Sales Channel and Sales Office');
        }

        // Create the business unit
        return prisma.businessUnit.create({
            data: {
                businessUnitCode: data.businessUnitCode,
                businessUnitDesc: data.businessUnitDesc,
                street1: data.street1,
                street2: data.street2,
                city: data.city,
                state: data.state,
                region: data.region,
                country: data.country,
                pinCode: data.pinCode,
                businessEntityId: businessEntity.id,
                factoryUnitId,
                salesChannelId,
                salesOfficeId
            },
            include: {
                businessEntity: { select: { businessEntityCode: true, businessEntityName: true } },
                factoryUnit: { select: { factoryUnitCode: true, factoryUnitName: true } },
                salesChannel: { select: { salesChannelId: true, salesChannelName: true } },
                salesOffice: { select: { salesOfficeCode: true, salesOfficeDesc: true } }
            }
        });
    }

    static async getAllBusinessUnits() {
        return prisma.businessUnit.findMany({
            include: {
                businessEntity: { select: { businessEntityCode: true, businessEntityName: true } },
                factoryUnit: { select: { factoryUnitCode: true, factoryUnitName: true } },
                salesChannel: { select: { salesChannelId: true, salesChannelName: true } },
                salesOffice: { select: { salesOfficeCode: true, salesOfficeDesc: true } }
            }
        });
    }

    static async getBusinessUnitByCode(code) {
        return prisma.businessUnit.findUnique({
            where: { businessUnitCode: code },
            include: {
                businessEntity: { select: { businessEntityCode: true, businessEntityName: true } },
                factoryUnit: { select: { factoryUnitCode: true, factoryUnitName: true } },
                salesChannel: { select: { salesChannelId: true, salesChannelName: true } },
                salesOffice: { select: { salesOfficeCode: true, salesOfficeDesc: true } }
            }
        });
    }

    static async updateBusinessUnitByCode(code, data) {
        const { error } = validateBusinessUnitUpdate(data);
        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(', '));
        }

        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: code }
        });
        if (!existingUnit) {
            throw new Error('Business Unit not found');
        }

        // Prevent changing the businessUnitCode through this method
        if (data.businessUnitCode && data.businessUnitCode !== code) {
            throw new Error('Cannot change businessUnitCode through this endpoint');
        }

        const updateData = {
            businessUnitDesc: data.businessUnitDesc,
            street1: data.street1,
            street2: data.street2,
            city: data.city,
            state: data.state,
            region: data.region,
            country: data.country,
            pinCode: data.pinCode
        };

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        return prisma.businessUnit.update({
            where: { businessUnitCode: code },
            data: updateData,
            include: {
                businessEntity: { select: { businessEntityCode: true, businessEntityName: true } },
                factoryUnit: { select: { factoryUnitCode: true, factoryUnitName: true } },
                salesChannel: { select: { salesChannelId: true, salesChannelName: true } },
                salesOffice: { select: { salesOfficeCode: true, salesOfficeDesc: true } }
            }
        });
    }

    static async deleteBusinessUnitByCode(code) {
        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: code }
        });
        if (!existingUnit) {
            throw new Error('Business Unit not found');
        }

        return prisma.businessUnit.delete({
            where: { businessUnitCode: code }
        });
    }
}

module.exports = BusinessUnitService;