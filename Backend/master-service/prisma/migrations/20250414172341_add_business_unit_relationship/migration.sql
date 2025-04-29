-- RenameIndex
ALTER INDEX "business_units_businessEntityId_factoryUnitId_key" RENAME TO "business_entity_factory_unit_unique";

-- RenameIndex
ALTER INDEX "business_units_salesChannelId_salesOfficeId_key" RENAME TO "sales_channel_sales_office_unique";
