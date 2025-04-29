-- RenameIndex
ALTER INDEX "business_entity_factory_unit_unique" RENAME TO "business_units_businessEntityId_factoryUnitId_key";

-- RenameIndex
ALTER INDEX "sales_channel_sales_office_unique" RENAME TO "business_units_salesChannelId_salesOfficeId_key";
