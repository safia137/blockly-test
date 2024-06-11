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

  Blockly.Blocks['werkstroom'] = {
    init() {
      this.appendDummyInput()
        .appendField("Werkstroom")
        .appendField(new Blockly.FieldDropdown(commonFields["Workflow Names"].call(this, 'NL')), "ACTION");
      this.appendDummyInput()
        .appendField("Taal")
        .appendField(new Blockly.FieldDropdown(commonFields["Taal"], function(language) {
          updateDetails(this.sourceBlock_, 'workflowName', language);
        }), "LANGUAGE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#0000FF");
      this.setTooltip("Represents a workflow.");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['zichtbaar'] = {
    init() {
      this.appendDummyInput()
        .appendField("Zichtbaar")
        .appendField("Stap")
        .appendField(new Blockly.FieldCheckbox("TRUE", function(checked) {
          const stepBlocks = this.sourceBlock_.getChildren(false).filter(block => block.type === 'stap');
          stepBlocks.forEach(block => {
            const correspondingJson = jsonData.find(item => item.stepOrder.toString() === block.getFieldValue('NUMBER'));
            if (correspondingJson) correspondingJson.StepIsVisible = checked;
          });
        }), "STEP_VISIBLE")
        .appendField("Fase")
        .appendField(new Blockly.FieldCheckbox("TRUE", function(checked) {
          const phaseBlocks = this.sourceBlock_.getChildren(false).filter(block => block.type === 'fase');
          phaseBlocks.forEach(block => {
            const correspondingJson = jsonData.find(item => item.phaseOrder.toString() === block.getFieldValue('NUMBER'));
            if (correspondingJson) correspondingJson.PhaseIsVisible = checked;
          });
        }), "FASE_VISIBLE");
      this.appendStatementInput("LOOP_BODY").setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#FFA500");
      this.setTooltip("Indicates visibility.");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['fase'] = {
    init() {
      this.appendDummyInput()
        .appendField("Fase")
        .appendField(new Blockly.FieldDropdown(uniquePhaseOrders.map(order => [order, order])), "NUMBER")
        .appendField("Taal")
        .appendField(new Blockly.FieldDropdown(commonFields["Taal"], function(language) {
          updateDetails(this.sourceBlock_, 'phaseName', language);
        }), "LANGUAGE");
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(commonFields["Phase Names"].call(this, 'NL'), function(action) {
          updateDetails(this.sourceBlock_, 'phaseName', this.sourceBlock_.getFieldValue('LANGUAGE'));
        }), "ACTION");
      this.appendStatementInput("LOOP_BODY").setCheck("stap").appendField("do");
      this.setPreviousStatement(true, ["fase", "proces", "werkstroom"]);
      this.setNextStatement(true, ["fase", "proces", "werkstroom"]);
      this.setColour("#4B0082");
      this.setTooltip("Represents a phase with a specific number and action.");
      this.setHelpUrl("");
    }
  };
