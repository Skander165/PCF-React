import { IInputs, IOutputs } from "./generated/ManifestTypes";
// import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import { Default, IDefaultProps } from "./HelloWorld";
import * as React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export class TabsReact
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private _context: ComponentFramework.Context<IInputs>;
  private _tabs: ComponentFramework.WebApi.Entity[] = [];
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */

  public async init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): Promise<void> {
    this._context = context;
    this.notifyOutputChanged = notifyOutputChanged;

    try {
      this._tabs = await this.getTabs();
      this._context.factory.requestRender();
      this.notifyOutputChanged();
    } catch (error) {
      console.log(error);
    }
    // context.factory.requestRender()
  }
  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const props: IDefaultProps = { tabs: this._tabs };

    const element = React.createElement(
      FluentProvider,
      { theme: webLightTheme },
      React.createElement(Default, props)
    );

    return element;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private getTabs(): Promise<ComponentFramework.WebApi.Entity[]> {
    // Generate the OData query string to retrieve the tabs
    const queryString = `?$count=true`;

    // Invoke the Web API Retrieve Multiple call and return the promise
    return this._context.webAPI
      .retrieveMultipleRecords("eytn_tabs", queryString)
      .then((response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
        // Retrieve Multiple Web API call completed successfully
        const tabs: ComponentFramework.WebApi.Entity[] = response.entities;
        return tabs; // Return the tabs array
      })
      .catch((errorResponse) => {
        // Error handling code here
        console.log(errorResponse);
        throw errorResponse; // Rethrow the error
      });
  }
}
