sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("valuehelp.controller.App", {
		handleValueHelp: function (oEvent){
			var sInputValue = oEvent.getSource().getValue();
			
			this.inputId = oEvent.getSource().getId();
			
			if(!this._valueHelpDialog){
				this._valueHelpDialog = sap.ui.xmlfragment("valuehelp.view.Dialog", this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			
			this._valueHelpDialog.getBinding("items").filter([
				new sap.ui.model.Filter("Carrid", sap.ui.model.FilterOperator.Contains, sInputValue)
			]);
			
			this._valueHelpDialog.open(sInputValue);
		},
		
		_handleValueHelpSearch: function (evt){
			var sValue = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Carrid", sap.ui.model.FilterOperator.Contains, sValue);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		
		_handleValueHelpClose: function(evt){
			var oSelectedItem = evt.getParameter("selectedItem");
			if(oSelectedItem){
				var productInput = this.getView().byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		}
	});
});