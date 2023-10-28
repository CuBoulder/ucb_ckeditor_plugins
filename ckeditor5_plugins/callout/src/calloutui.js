import { Plugin } from "ckeditor5/src/core";
import {
  ButtonView,
  ContextualBalloon,
  clickOutsideHandler,
} from "ckeditor5/src/ui";
import FormView from "./calloutview";
import icon from "../../../icons/callout.svg";

export default class CalloutUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }
  static get pluginName() {
    return "CalloutUI";
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const insertCalloutCommand = editor.commands.get("addCallout");
    const viewDocument = editor.editing.view.document;

    // Create the balloon and the form view.
    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView(editor.locale);
    this.buttonView = null;

    // This will register the Callout button to the toolbar
    componentFactory.add("callout", (locale) => {
      const button = new ButtonView(locale);

      button.label = "Callout";
      button.icon = icon;
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;
      // Show the UI on button click.
      this.listenTo(button, "execute", () => {
        this._showUI(insertCalloutCommand.existingCalloutSelected);
      });

      this.buttonView = button;

      // Show the on/off in Toolbar if a button is already selected.
      const upcalloutTextCalloutState = () => {
        const calloutSelected =
          insertCalloutCommand.existingCalloutSelected;
        button.isOn = !!calloutSelected;
      };

      // Listen for changes in the cuCallout selection.
      this.listenTo(
        insertCalloutCommand,
        "change:value",
        upcalloutTextCalloutState
      );
      this.listenTo(
        insertCalloutCommand,
        "change:existingCalloutSelected",
        upcalloutTextCalloutState
      );

      // Shows the UI on click of a button widget.
      this.listenTo(viewDocument, "click", () => {
        if (insertCalloutCommand.existingCalloutSelected)
          this._showUI(insertCalloutCommand.existingCalloutSelected);
      });

      this.on("showUI", (eventInfo, newButton) => {
        this._showUI(newButton);
      });

      // Bind the state of the button to the command.
      button
        .bind("isOn", "isEnabled")
        .to(insertCalloutCommand, "value", "isEnabled");

      return button;
    });
  }

  _createFormView(locale) {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const formView = new FormView(locale, componentFactory);

    // Execute the command after clicking the "Save" button.
    this.listenTo(formView, "submit", () => {
      // Grab values from the Form and title input fields.
      const value = {
        calloutText: formView.calloutTextInputView.fieldView.element.value,
        size: formView.size,
      };
      editor.execute("addCallout", value);

      // Hide the form view after submit.
      this._hideUI();
    });

    // Hide the form view after clicking the "Cancel" button.
    this.listenTo(formView, "cancel", () => {
      this._hideUI();
    });

    // Close the panel on esc key press when the form has focus.
    formView.keystrokes.set("Esc", (data, cancel) => {
      this._hideUI();
      cancel();
    });

    // Hide the form view when clicking outside the balloon.
    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI(),
    });

    return formView;
  }

  _showUI(selectedButton) {
    this.buttonView.isOn = true;

    // If there's an existing balloon open, close it!
    if (this._balloon.visibleView) {
      this._hideUI();
    }
    // Check the value of the command.
    const commandValue = this.editor.commands.get("addCallout").value;

    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
    });

    if (selectedButton) {
      const size = selectedButton.getAttribute("cuCalloutSize");
      const calloutTextElement = selectedButton.getChild(0); // Get the first child element

      // Check if the calloutTextElement exists and has data
      if (calloutTextElement && calloutTextElement.data) {
        const calloutText = calloutTextElement.data; // Extract the calloutText from the data
        this.formView.size = size;

        // Set the calloutText input field value
        this.formView.calloutTextInputView.fieldView.value = calloutText;
        this.formView.calloutTextInputView.fieldView.element.value = calloutText; // UpcalloutText the input field value
        this.formView.calloutTextInputView.fieldView.set("value", calloutText); // UpcalloutText the input field value (alternative method)
      }
    }

    // Disable the input when the selection is not collapsed.
    // this.formView.calloutTextInputView.isEnabled = selection.getFirstRange().isCollapsed;

    // Fill the form using the state (value) of the command.
    if (commandValue) {
      this.formView.calloutTextInputView.fieldView.value = commandValue.calloutText;
      this.formView.sizeDropdown.fieldView.value = commandValue.size;
    }
    setTimeout(() => {
      this.formView.calloutTextInputView.fieldView.focus();
    }, 0);
  }
  _hideUI() {
    // Case for if user is rapidly clicking add button to button group
    if (!this._balloon.hasView(this.formView)) {
      return; // If the formView isn't in the balloon, do nothing
    }
    // Clear the input field values and reset the form.
    this.formView.element.reset();
    this.buttonView.isOn = false;

    this._balloon.remove(this.formView);

    // Focus the editing view after inserting the tooltip so the user can start typing the content
    // right away and keep the editor focused.
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return {
      target,
    };
  }
}
