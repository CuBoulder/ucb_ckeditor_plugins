import { Plugin } from "ckeditor5/src/core";
import {
  ButtonView,
  ContextualBalloon,
  clickOutsideHandler,
} from "ckeditor5/src/ui";
import FormView from "./countdownview";
import icon from "../../../icons/countdown.svg";

export default class CountdownUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }
  static get pluginName() {
    return "CountdownUI";
  }

  init() {
    const editor = this.editor;
    const componentFactory = editor.ui.componentFactory;
    const insertCountdownCommand = editor.commands.get("addCountdown");
    const viewDocument = editor.editing.view.document;

    // Create the balloon and the form view.
    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView(editor.locale);
    this.buttonView = null;

    // This will register the Countdown button to the toolbar
    componentFactory.add("countdown", (locale) => {
      const button = new ButtonView(locale);

      button.label = "Countdown";
      button.icon = icon;
      button.tooltip = true;
      button.withText = false;
      button.isToggleable = true;
      // Show the UI on button click.
      this.listenTo(button, "execute", () => {
        this._showUI(insertCountdownCommand.existingCountdownSelected);
      });

      this.buttonView = button;

      // Show the on/off in Toolbar if a button is already selected.
      const updateCountdownState = () => {
        const countdownSelected =
          insertCountdownCommand.existingCountdownSelected;
        button.isOn = !!countdownSelected;
      };

      // Listen for changes in the cuCountdown selection.
      this.listenTo(
        insertCountdownCommand,
        "change:value",
        updateCountdownState
      );
      this.listenTo(
        insertCountdownCommand,
        "change:existingCountdownSelected",
        updateCountdownState
      );

      // Shows the UI on click of a button widget.
      this.listenTo(viewDocument, "click", () => {
        if (insertCountdownCommand.existingCountdownSelected)
          this._showUI(insertCountdownCommand.existingCountdownSelected);
      });

      this.on("showUI", (eventInfo, newButton) => {
        this._showUI(newButton);
      });

      // Bind the state of the button to the command.
      button
        .bind("isOn", "isEnabled")
        .to(insertCountdownCommand, "value", "isEnabled");

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
        date: formView.dateInputView.fieldView.element.value,
        background: formView.background,
        style: formView.style,
      };
      editor.execute("addCountdown", value);

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
    const commandValue = this.editor.commands.get("addCountdown").value;

    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
    });

    if (selectedButton) {
      const background = selectedButton.getAttribute("cuCountdownBackground");
      const style = selectedButton.getAttribute("cuCountdownStyle");
      const dateElement = selectedButton.getChild(0); // Get the first child element

      // Check if the dateElement exists and has data
      if (dateElement && dateElement.data) {
        const date = dateElement.data; // Extract the date from the data
        this.formView.background = background;
        this.formView.style = style;

        // Set the date input field value
        this.formView.dateInputView.fieldView.value = date;
        this.formView.dateInputView.fieldView.element.value = date; // Update the input field value
        this.formView.dateInputView.fieldView.set("value", date); // Update the input field value (alternative method)
      }
    }

    // Disable the input when the selection is not collapsed.
    // this.formView.dateInputView.isEnabled = selection.getFirstRange().isCollapsed;

    // Fill the form using the state (value) of the command.
    if (commandValue) {
      this.formView.dateInputView.fieldView.value = commandValue.date;
      this.formView.backgroundDropdown.fieldView.value =
        commandValue.background;
      this.formView.styleDropdown.fieldView.value = commandValue.style;
    }
    setTimeout(() => {
      this.formView.dateInputView.fieldView.focus();
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
