Blockly.Blocks['proces'] = {
    init() {
      this.appendDummyInput()
        .appendField("Proces")
        .appendField("Taal")
        .appendField(new Blockly.FieldDropdown(commonFields["Taal"], function(language) {
          updateDetails(this.sourceBlock_, 'productType', language);
          updateDetails(this.sourceBlock_, 'productForm', language);
        }), "LANGUAGE");
      this.appendDummyInput()
        .appendField("Product Type")
        .appendField(new Blockly.FieldDropdown(commonFields["Product Types"].call(this, 'NL')), "PRODUCT_TYPE");
      this.appendDummyInput()
        .appendField("Product Form")
        .appendField(new Blockly.FieldDropdown(commonFields["Product Forms"].call(this, 'NL')), "PRODUCT_FORM");
      this.appendStatementInput("LOOP_BODY").setCheck(["fase", "stap"]);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Represents a looping process with selectable options.");
      this.setHelpUrl("");
    }
  };