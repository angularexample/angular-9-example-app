# angular-9-example-app
Angular 9 Example App. Angular 9 Best Practices. Angular 9 Architecture for Large Scale.

A full Angular Example app with Angular Routing, State Management, and nested Ajax API calls using Observables.

Angular 9 Unit Testing with Jasmine, Karma and 100% coverage using Istanbul.

Uses **Stack Exchange API** to search StackOverflow.

Created by **AngularExample** [https://github.com/angularexample](https://github.com/angularexample)

The full source code is available at: [https://github.com/angularexample/angular-9-example-app](https://github.com/angularexample/angular-9-example-app)

## Running Example

Click for running example:
[angular-9-example-app](https://angularexample.github.io/angular-9-example-app)

### Screen Shot

![angular-9-example-app](https://github.com/angularexample/angular-9-example-app/blob/master/src/assets/images/angular-9-example-app.png)

## Same App In React and Polymer

Here is the same app written in React and Polymer:

* [react-example-app](https://github.com/reactjsexample/react-example-app)
* [polymer-3-example-app](https://github.com/polymerexample/polymer-3-example-app)

## Table of Contents
- [About The Author](#about-the-author)
- [Project Setup](#project-setup)
  * [Prerequisites](#prerequisites)
  * [How To Install](#how-to-install)
  * [How To Run](#how-to-run)
  * [How To Run Unit Tests](#how-to-run-unit-tests)
  * [How To Run End To End Tests](#how-to-run-end-to-end-tests)
- [Software Libraries Used](#software-libraries-used)
- [UI And Program Flow](#ui-and-program-flow)
  * [UI Begins With Search Box](#ui-begins-with-search-box)
  * [Two Main Views for Results](#two-main-views-for-results)
    * [Questions View](#questions-view)
      * [Questions Paging](#questions-paging)
      * [Question Title Is Link To Answers](#question-title-is-link-to-answers)      
    * [Answers View](#answers-view)
      * [Question Properties](#question-properties)
      * [Answer Properties](#answer-properties)
- [UI Best Practices](#ui-best-practices)
  * [Cursor Starts In Search Box](#cursor-starts-in-search-box)
  * [Placeholder Text For Input Purpose](#placeholder-text-for-input-purpose)
  * [Search Input Has X Icon To Delete Text](#search-input-has-x-icon-to-delete-text)
  * [Voice Reader Identifies Search Box For Visually Impaired Users](#voice-reader-identifies-search-box-for-visually-impaired-users)
  * [Search Button Uses Standard Icon](#search-button-uses-standard-icon)
  * [Search Button Has Ripple Animation On Click](#search-button-has-ripple-animation-on-click)
  * [Hover Text Appears Over Search Button](#hover-text-appears-over-search-button) 
  * [Search Button Disabled Until User Enters Data](#search-button-disabled-until-user-enters-data)
  * [Enter Key Will Execute The Search](#enter-key-will-execute-the-search)
  * [Progress Spinner Shown During Backend Request](#progress-spinner-shown-during-backend-request)
  * [Show A Warning Message When No Results Are Found](#show-a-warning-message-when-no-results-are-found)
  * [Show An Error Message When An HTTP Request Results In An Error](#show-an-error-message-when-an-http-request-results-in-an-error)
- [Architecture For Large Scale Apps](#architecture-for-large-scale-apps)
  * [Library Has Reusable Modules](#library-has-reusable-modules)
    * [The Alert Service](#the-alert-service)
      * [The Alert Component](#the-alert-component)
    * [The Data Service](#the-data-service)
    * [The Data Response Interceptor](#the-data-response-interceptor)
    * [The Event Manager](#the-event-manager)
      * [Advantages Of The Event Manager](#advantages-of-the-event-manager)
        * [A Single Place For All Custom Event Handling](#a-single-place-for-all-custom-event-handling)
        * [Managing Events In JSON](#managing-events-in-json)
    * [The Message Service](#the-message-service)
      * [Using The Message Service To Trigger Custom Events](#using-the-message-service-to-trigger-custom-events)
      * [Subscribers Receive The Message](#subscribers-receive-the-message)
      * [Advantages Of The Message Service](#advantages-of-the-message-service)
    * [The State Store Service](#the-state-store-service)
      * [Storing Data Using The State Store](#storing-data-using-the-state-store)
      * [Retrieving Data Using The State Store](#retrieving-data-using-the-state-store)             
  * [Component To Component Communication](#component-to-component-communication)
    * [Sending The Data](#sending-the-data)
    * [Receiving The Data](#receiving-the-data)
    * [Configuring The Event](#configuring-the-event)
    * [Why Not To Use Component Input and Output](#why-not-to-use-component-input-and-output)
      * [Avoiding A Design That Depends on DOM Structure](#avoiding-a-design-that-depends-on-dom-structure)
  * [Advantages Of Multicast Plus State Store Plus Event Manager](#advantages-of-multicast-plus-state-store-plus-event-manager)
    * [Multicast Uses Publish And Subscribe](#multicast-uses-publish-and-subscribe)
      * [Communication Can Go To Mutiple Receivers](#communication-can-go-to-mutiple-receivers)
    * [One Event Takes Multiple Actions](#one-event-takes-multiple-actions)
    * [Other Designs Use Watchers On Data](#other-designs-use-watchers-on-data)
      * [Performance Is Increased Without Watchers](#performance-is-increased-without-watchers)
    * [Requires Less Coding](#requires-less-coding)
    * [Code Is Easy To Read and Understand](#code-is-easy-to-read-and-understand)
    * [Enables Lightweight Components](#enables-lightweight-components)
    * [Works With Both Services and Components](#works-with-both-services-and-components)
    * [Facilitates Portability And Reusability](#facilitates-portability-and-reusability)
    * [Communication Is Decoupled From DOM Structure](#communication-is-decoupled-from-dom-structure)
    * [Easier To Debug](#easier-to-debug)
    * [Decouples Data And Application State From All Services and Components](#decouples-data-and-application-state-from-all-services-and-components)
    * [State Can Be Preserved And Restored](#state-can-be-preserved-and-restored) 
- [Responsive Design](#responsive-design)
  * [Body Font Size Controls Global Rem Sizes](#body-font-size-controls-global-rem-sizes)      
    * [CSS Media Queries](#css-media-queries)
      * [SASS Partial Files For Media Queries](#sass-partial-files-for-media-queries)
  * [Scalable Images Are Responsive](#scalable-images-are-responsive)
    * [Images Should Be SVG Whenever Possible](#images-should-be-svg-whenever-possible)
      * [Setting Image Scale In CSS](#setting-image-scale-in-css)
        * [Using View Width in CSS](#using-view-width-in-css)
        * [Setting Image Min and Max Size](#setting-image-min-and-max-size)
- [Angular Best Practices](#angular-best-practices)
  * [Naming Conventions](#naming-conventions)
    * [Angular Class Names](#angular-class-names)
    * [CSS Class Names](#css-class-names)
  * [Organize Components Or Services With Modules](#organize-components-or-services-with-modules)
    * [Create A Directory For Each Module](#create-a-directory-for-each-module)
    * [Create A Module For Each Component](#create-a-module-for-each-component)
      * [Export The Component In Its Own Module](#export-the-component-in-its-own-module)
      * [Example Component Module](#example-component-module)
      * [Example Parent Component Module Using The Component](#example-parent-component-module-using-the-component)
    * [Create A Module For Each Service](#create-a-module-for-each-service)
      * [Example Service Module](#example-service-module)
      * [Example Parent Component Module Using The Service](#example-parent-component-module-using-the-service)
      * [When Not To Create A Module For A Service](#when-not-to-create-a-module-for-a-service)
      * [Services Imported By A Service Module Have Global Scope](#services-imported-by-a-service-module-have-global-scope)
      * [Services Provided By Any Module Are Singletons](#services-provided-by-any-module-are-singletons)
      * [A Service Can Be Provided More Than Once](#a-service-can-be-provided-more-than-once)
      * [A Service Provided At Component Level Is Not A Singleton](#a-service-provided-at-component-level-is-not-a-singleton)
    * [Dont Group Things By Class Type](#dont-group-things-by-class-type)
    * [Do Group By Feature Using Module](#do-group-by-feature-using-module)
      * [Example Module For The Gizmo Feature](#example-module-for-the-gizmo-feature)
      * [Refactoring The Gizmo Feature Is Easy](#refactoring-the-gizmo-feature-is-easy)
    * [Import Modules At The Lowest Level](#import-modules-at-the-lowest-level)
      * [Header Module Uses Lowest Imports](#header-module-uses-lowest-imports)
      * [Search Box Module Uses Lowest Imports](#search-box-module-uses-lowest-imports)
      * [Wrong Way Has Imports At App Module](#wrong-way-has-imports-at-app-module)
      * [Tutorials Train The Wrong Way](#tutorials-train-the-wrong-way) 
      * [Large Scale Projects Lead To The Better Way](#large-scale-projects-lead-to-the-better-way)
      * [Example Where To Import FormsModule](#example-where-to-import-formsmodule)
      * [Its Ok To Import Things Twice](#its-ok-to-import-things-twice)
      * [Ng Generate Adds Component To App Module](#ng-generate-adds-component-to-app-module)
        * [Remove Generated Component From App Module](#remove-generated-component-from-app-module)

## About The Author

**JC Lango** is a UI Architect and UI Developer for large scale web applications at several Fortune 500 companies.

He is an expert in **Angular**, **Polymer**, and **React** and maintains these sites at Github:

* **AngularExample** [https://github.com/angularexample](https://github.com/angularexample)
* **PolymerExample** [https://github.com/polymerexample](https://github.com/polymerexample)
* **ReactJSExample** [https://github.com/reactjsexample](https://github.com/reactjsexample)

JC may be available to work remote, and can be contacted at these links:
 
* LinkedIn: [https://www.linkedin.com/in/jclango](https://www.linkedin.com/in/jclango)
* Email: [jobs@jclango.com](mailto:jobs@jclango.com)

## Project Setup

### Prerequisites

You need to have Node and NPM installed on your PC.

[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### How To Install

Download the source code using git or else download and unzip the zip file.

Open a terminal window and go to the project root folder.

You need to have npm installed globally.

Run `npm i` to install the required libraries.

### How To Run

Run `ng serve` for a dev server.

Navigate to `http://localhost:4200/`.

The browser will automatically reload if you change any of the source files.

### How To Run Unit Tests

To run the unit tests, you need to stop the server.
 
If the server is running, stop the server from the terminal window by pressing *Control-C*.

To run the unit tests, Run the following command in the terminal window.

`ng test -- --no-watch --no-progress --browsers=ChromeHeadlessCI`

And if you're running on Windows,
include the `--disable-gpu` flag. See [crbug.com/737678](https://bugs.chromium.org/p/chromium/issues/detail?id=737678).

### How To Run End To End Tests

To run the unit tests using Angular *cli*, you need to stop the server.
 
If the server is running, stop the server from the terminal window by pressing *Control-C*.

To run the e2e tests using Angular cli, Run the following command in the terminal window.

`ng e2e -- --protractor-config=e2e/protractor-ci.conf.js`

And if you're running on Windows,
include the `--disable-gpu` flag. See [crbug.com/737678](https://bugs.chromium.org/p/chromium/issues/detail?id=737678).

## Software Libraries Used

The following major software libraries are used:
```text
Angular 9
Angular Material 8
RxJS 6
```

## UI And Program Flow

This project demonstrates how to use Angular HttpClient to do Ajax Fetch calls with API endpoints by subscribing to Observables.

It uses the **Stack Exchange API** to search **StackOverflow** for question titles, and displays a list of matching questions.

A basic header with a logo and the app title is at the top of the page.

A search input box is displayed below the header. The search results will be shown below the search box.

### UI Begins With Search Box

The user enters the search text and clicks the search icon button.
It does not use auto-complete. It does not search while entering text.

The search text is matched against the title of the question.

### Two Main Views For Results

#### Questions View

After clicking the search icon button, a list of question titles is shown. They are in order of the highest score.

Only questions that have an answer are listed.

##### Questions Paging

The default page size is used, so a maximum of 30 questions are displayed at a time.

At the bottom right side of the page, the page number is displayed,
followed by three button icons. Hovering each button shows a tooltip.
* Go to First Page
* Go to Previous Page
* Go to Next Page

##### Question Title Is Link To Answers

Each question title is styled to appear as a link. 
When the user clicks on the link, the questions list disappears, 
and the selected question is displayed in the Answers View.

#### Answers View

Once a question is selected, the Answers View is shown.
 
##### Question Properties

At the top of the answers view is the selected question.

These are the displayed properties or caption names and corresponding API fields for the question: 
```text
Title               title
Number of Views     view_count
Score               score
Tags                tags (array converted to comma delimited string)
Asked               creation_date (time number converted to standard format)               
(question text)     body
```

The question title is shown in large bold print at the top.

The full question text is shown below the title.

A list of the answers is shown below that. The answers are in order of the highest score. 

##### Answer Properties

These are the displayed properties or caption names and corresponding API fields for the answer: 
```text
Score               score
Answered            creation_date (time number converted to standard format)               
(answer text)       body
(green background)  is_accepted (highlighted when true)
```

## UI Best Practices

Some the details of the UI design should be pointed out to show some best practices.

For reference, here is the template code for the search box:

**xxx-search-box.component.html**
```
<form #formcontrol="ngForm" (ngSubmit)="onSearchClick()">
  <input [(ngModel)]="searchText" aria-level="enter search text" autofocus class="form-control" name="searchText"
         placeholder="Enter Search Text" required="" type="search">
  <button [disabled]="!formcontrol.form.valid" mat-icon-button title="Do Search">
    <mat-icon>search</mat-icon>
  </button>
</form>
```

### Cursor Starts In Search Box
 
When the page first loads, the cursor automatically starts in the search box.

In the *input* element, we add the *autofocus* attribute.

`<input ... autofocus ... >`

### Placeholder Text For Input Purpose

When the user first sees the *input* text box, it contains a label, "Enter Search Text".

As soon as the user begins to enter text, the label disappears.

In the *input* element, we add the *placeholder* attribute, with the label for the value.

`<input ... placeholder="Enter Search Text" ... >`

### Search Input Has X Icon To Delete Text

After the user has entered any text, a small "X" icon button appears on the right
side of the search box.

When the search box is empty, the "X" icon button disappears.

In the *input* element, we add the *type* attribute, with value set to "search".

`<input ... type="search">`

### Voice Reader Identifies Search Box For Visually Impaired Users

Visually impaired users generally use a voice reader plugin on the browser.

When the tab control or the cursor is on the search box, 
the voice reader identifies the control. The user hears "enter search text".

In the *input* element, we add the *aria-label* attribute, with the voice text for the value.

`<input ... aria-label="enter search text" ... >`

### Search Button Uses Standard Icon

The search button uses a standard icon to help the user identify the control.

We use standard icons from the *Material Icon* set throughout the app,
for a consistent look and feel.

```
  <button ... mat-icon-button ...>
    <mat-icon>search</mat-icon>
  </button>
```

### Search Button Has Ripple Animation On Click

The search button has a ripple effect animation on click.

This is done using *Angular Material*.

In the *button* element, we add the  *mat-icon-button* attribute.

```
  <button ... mat-icon-button ...>
    <mat-icon>search</mat-icon>
  </button>
```

We use  *Angular Material* controls whenever possible throughout the app,
for a consistent look and feel, and a more modern user experience.

### Hover Text Appears Over Search Button

When the cursor is hovered over the search icon button.
hover text appears with the label "Do Search".

In the *button* element, we add the  *title* attribute,
with the value set to the hover text.

`<button ... title="Do Search">`

This also serves to allow the voice reader to announce the same text,
in the case of a visually impaired user.

### Search Button Disabled Until User Enters Data

When the page first loads, the search button is disabled.

After the user enters some search text, then the button is enabled.

This is accomplished by first enclosing all the controls inside an Angular form.
The *formcontrol* is used to reference the form in our controls.

`<form #formcontrol="ngForm" ... >`

In the *button* element, we bind the *disabled* attribute to the form's validity.

`<button ... [disabled]="!formcontrol.form.valid" ... >`

In the *input* element, we add the *required* attribute.

`<input ... required="" ... >`

### Enter Key Will Execute The Search

We want the user to be able to press the *enter* key to run the search.

To do this, we must do two things.

1. Contain the search box inside an Angular *form*.
2. Bind our component's search method to the form's submit attribute.

`<form #formcontrol="ngForm" (ngSubmit)="onSearchClick()">`

Notice that, after we do that, we don't need to bind the *button* click at all.

### Progress Spinner Shown During Backend Request

Another UI best practice is to show some kind of progress or busy indicator
to the user during any backend request.

This is because we can't be sure of how long any request wil take.

Otherwise, if there is a long delay, of more than a second or two, the app will appear to
be broken or frozen.

So we use the Angular Material *spinner*, and show it during any XHR.

This is done by setting a boolean flag in our compnent's TS file,
at the beginning of the data request.

**xxx-stack-exchange-questions.component.ts**
```
  private getQuestions() {
    this.isBusy = true;
    ...
  }  
```

Then, in the success, and in the failure callback methods, we clear the flag.

```
  private onSuccessGetQuestions(result) {
    this.isBusy = false;
    ...
  }
```

```
  private onErrorGetQuestions(result) {
    this.isBusy = false;
    ...
  }
```

Then, in the component's template file, we add the *spinner*,
and bind the *ngIf* directive to the boolean flag.

**xxx-stack-exchange-search.component.html**
```
<div class="xxx-spinner-container" ... *ngIf="isBusy">
  <mat-spinner></mat-spinner>
</div>
```

### Show A Warning Message When No Results Are Found

Another UI best practice is to show the user some kind of message when no results are found,
after a search is done.

Otherwise, the user will see just a blank screen. And, in that case,
it may appear that the app is broken or frozen,
or else it might just appear that the search has not yet been executed.

It might seem like the search button is not even working. 

In this app, we are using an Angular Material *snackbar* to show a pop up
dialog box, with a warning message, whenever the search produces no results.

```
  private onSuccessGetQuestions(result) {
    this.isBusy = false;
    if ((result.hasOwnProperty('items'))
        && (typeof result.items === 'object')
        && (result.items.length > 0)) {
      this.questions = result.items;
      this.isResult = true;
    } else {
      const warningMsg = 'No Results Found';
      this.xxxAlertService.openAlert('warn', warningMsg);
    }
    ...
 }
```

### Show An Error Message When An HTTP Request Results In An Error

Another UI best practice is to show the user some kind of message when an error occurs,
after a search is done.

Otherwise, the user will see just a blank screen. And, in that case,
it may appear that the app is broken or frozen,
or else it might just appear that the search has not yet been executed.

It might seem like the search button is not even working. 

In this example app, we use three of our reusable library services to:
1. Intercept HTTP errors, [The Data Response Interceptor](#the-data-response-interceptor)
2. Notify the *app component*, [The Message Service](#the-message-service)
3. Show the error message, [The Alert Service](#the-alert-service)

Since the HTTP errors are being handled automatically by the *data response interceptor*,
there is no error handling being done in the component at all.

This makes it easier to code all of our app's components.

## Architecture For Large Scale Apps

Design principles in this example are followed for use in large scalable applications.
 
### Library Has Reusable Modules

The  `app/xxx-common/` directory contains the resusable modules. These modules can be copied as is, 
and imported into any other Angular app.

* xxx-alert, [The Alert Service](#the-alert-service)
* xxx-data,  [The Data Service](#the-data-service)
* xxx-data-response-interceptor, [The Data Response Interceptor](#the-data-response-interceptor)
* xxx-event-mgr, [The Event Manager](#the-event-manager)
* xxx-message, [The Message Service](#the-message-service)
* xxx-state-store, [The State Store Service](#the-state-store-service)

#### The Alert Service

We use the *alert service* to show an Angular Material Snackbar alert dialog.
It contains an icon that changes to show the type of alert.

An alert can be one of three types:
1. **Info**, Green, For an information message
2. **Error**, Red, For an error message
3. **Warning**, Yellow, For a warning message

The alert dialog uses animation to slide down from the top of the screen.
It is shown and closes automatically after 10 seconds.

There is also a icon button on the right side that lets the user close the alert sooner.

Only one alert can be shown at a time.

##### The Alert Component
The snackbar is configured to use a custom component, the *XxxAlertComponent*.
The *alert component* allows us to provide the custom styling and the 3 different types.

You don't need to include the *alert component* in any of your HTML templates.
The alert service is designed to inject the *alert component* into the DOM whenever it is needed.

#### The Data Service

The *data service* is used for HTTP requests. It uses the Angular HttpClient service.

The *data service* is bound to [The Data Response Interceptor](#the-data-response-interceptor).

#### The Data Response Interceptor

The *data response interceptor* automatically handles all HTTP requests that return an error.

This allows us to handle all XHR errors globally and in a consistent way.
It also makes coding easier, since we don't need to handle errors at the point where you are making the request.

The *data response interceptor* uses [The Message Service](#the-message-service),
to notify the *app component*, 
which uses [The Alert Service](#the-alert-service) to display an error message.
 
#### The Event Manager

The *event manager* handles all custom events for the application.

This service can be injected into any other component or service which needs to communicate the fact that an event has occurred.

It has a single public method that takes your custom event id:
`xxxEventMgr.handleEvent('searchBox.searchTextChanged');`

##### Advantages Of The Event Manager

###### A Single Place For All Custom Event Handling

The *event manager* acts as a central single collection point for all of the custom events in the whole application.

This makes event debugging easier. You can add a temporary `console.log('eventId', eventId)`
and then you can see all of the events, in order, as they occur.

###### Managing Events In JSON

The configuration of events in the JSON file makes it easier to make changes.
Some changes can be made in the JSON, without the need to change any of your other code.

Lookind at the JSON file gives you a way to get quick and accurate overview of all of your custom events
that are controlling the program flow.

If you use meaningful key names, you can easily understand what events are occurring,
and what actions are taken for each event.

You can also easily take several different actions in the case of a single event.

These actions can be quickly changed, added, removed, or reordered. And in many cases,
none of youe TS files will need to be changed.

#### The Message Service

The *message service* uses *RxJS Subject* to provide a means for component to component communication.

The *RxJS Subject* is similiar to an *Observable* but it has the added benefit of being able
to guarantee that the observed value will not change before it can be observed by multiple observers.
This makes it a prefect choice for a *multicast*.

In this app, the *message service* is mostly used by the [The Event Manager](#the-event-manager)
to trigger all of the custom events that control the program flow.

##### Using The Message Service To Trigger Custom Events

To use the message service we first create a message object with a unique key:
```
const message=new XxxMessage('searchTextChanged');
```
The best practice is use a string key that is meaningful.
In this case we want to indicate that the search text has changed.

The next step is to send the message:
```
xxxMessageService.broadcast(message);
```
##### Subscribers Receive The Message

After the message is broadcast, one or more subscribers will instantly receive the message.
This is generally used to notify another component that something has happened.

Here is the code to subscribe to the message.
```
    this.subscriptionSearchTextChange = this.xxxMessageService.subscribe('searchTextChange', () => {
      this.onSearchTextChange();
    });
```

##### Advantages Of The Message Service

The *message service* uses multicasting, which is bases on a publish and subscribe methodology.

This way of component to component communication is free from the limitations of any required DOM structure.

#### The State Store Service

The *state store service* is a singleton that creates a single data object that contains
all of the data that represents the state of the application.

It also is a way to pass data from one component to another.

##### Storing Data Using The State Store

The *state store service* uses a unique key string to store any type of data.

Here is an example of how to store data using the *state store service*:
```
this.xxxStateStoreService.putItem('searchText', this.searchText);
```
The best practice is to use a meaningful key string.

In this case we are storing the search text, so we used the key `'searchText'`

##### Retrieving Data Using The State Store

The *state store service* uses a unique key to retrieve any type of data that
has been stored.

Here is an example of how to retrieve data using the *state store service*:
```
this.searchText = this.xxxStateStoreService.getItem('searchText');
```
  
### Component To Component Communication

Component to component communication can be done in many different ways. 
In this example we use a design that is most efficient for large scaleable apps.

This design relies on three of our library services:
* [The Event Manager](#the-event-manager) - Manages All Custom Events
* [The Message Service](#the-message-service) - Notifies Other Components
* [The State Store Service](#the-state-store-service) - Shares Data and Maintains State

In practice, it takes just 3 steps:
1. Setup the event config in the events.json. [Configuring The Event](#configuring-the-event).
2. In the first component, add code for [Sending The Data](#sending-the-data).
3. In the second component, add code for [Receiving The Data](#receiving-the-data).

#### Sending The Data

In this app, the *search box component* needs to communicate with the *stack exchange search* component.

After entering the search text, the user clicks the *Search* button.

So now we need to pass the search text from the *search box component* to the
*stack exchange search* component. 

Sending data is a 2-step process.

1. Store the data, with a certain key, using the state store.
2. Generate an event, with a certain key, to notify the other component.

Here is the code to send data:
```
  onSearchClick() {
    this.xxxStateStoreService.putItem('searchText', this.searchText);
    this.xxxEventMgrService.handleEvent('searchBox.search');
  }
```

#### Receiving The Data

Receiving data is a 2-step process.

1. Subscribe to a message, with a certain key, using the message service.
2. Retrieve the data, with a certain key, using the state store.

Here is the code to receive the data...

It is done in two parts.
Part one is, subscribe to the desired message:
```
    this.subscriptionSearchTextChange = this.xxxMessageService.subscribe('searchTextChange', () => {
      this.onSearchTextChange();
    });
```
Part two is, get the data from state store:
```
  private onSearchTextChange() {
    this.searchText = this.xxxStateStoreService.getItem('searchText');
    ...
  }
```

#### Configuring The Event

Since we are using the *event manager* to manage all of our events,
we need to put the event key into the JSON file.

Here is the event config:
```json
    {
      "eventId": "searchBox.search",
      "actions": [
        {
          "action": "broadcast",
          "actionKey": "searchTextChange"
        }
      ]
    }
```
When the event manager runs the `handleEvent('searchBox.search')` method,
it uses the event config we set up in the JSON to decide how to handle this event.

In this case, it knows it needs to do a `broadcast action`.

And it knows to use the given key `searchTextChange`.

So it uses the [The Message Service](#the-message-service) to broadcast a message that contains that key.

This is the same key that any subscriber can use to receive the message.
This will be used to trigger your handler in the receiving component.

#### Why Not To Use Component Input and Output

You often see data being passed from one component to another using Angular's *Input* and *Output*.
But this is generally not the best choice for scaleable apps or reuseable components.

##### Avoiding A Design That Depends on DOM Structure

If you use Angular's *Input* and *Output*, you must rely on a specific parent-child DOM structure.
This design can fail if you later decide to restructure the DOM.

For example let's say you need to move just one the components from the header to the body.
This will break the required parent-child relationship.

In this case your component communication design using *Input* and *Output* will no longer work.

### Advantages Of Multicast Plus State Store Plus Event Manager

Let's say we have a user action that requires us to:
 * clear the screen in several different view panes
 * close a navigation panel
 * disable some controls in the header
 * retrieve some new data from the backend
 * open a selector panel
 * display the selection controls

In this case, we configure the *event manager* to have a single event, 
that does multiple actions.

These actions are to broadcast different messages.

We then can have multiple components, listening to these messages,
and then taking different actions.

We can even send multiple messages to a single component.

All of this becomes simple to program using this design.

#### Multicast Uses Publish And Subscribe

The *message service* uses multicasting which is a publish and subscribe methodology.

A multicast communications design enables a single publisher
to broadcast a single message to multiple subscribers.

##### Communication Can Go To Mutiple Receivers

With Angular's *Input* and *Output* and it's dependance on a parent - child DOM structure,
it is not intended to be used to communicate with multiple receivers.

But our design that uses multicast plus state store can easily be used to communicate
with multiple receivers at the same time.

#### One Event Takes Multiple Actions

The *event manager* uses an event configuration in a JSON file to link actions to an event.

In our complex event example we might configure an event like this:
```json
    {
      "eventId": "table.xButtonClicked",
      "actions": [
        {
          "action": "broadcast",
          "actionKey": "charts.clear"
        },
        {
          "action": "broadcast",
          "actionKey": "rightSideNav.close"
        },
        {
          "action": "broadcast",
          "actionKey": "header.disableSearch"
        },
        {
          "action": "broadcast",
          "actionKey": "leftSideNav.open"
        },
        {
          "action": "broadcast",
          "actionKey": "leftSideNav.selectorMode"
        },
        {
          "action": "broadcast",
          "actionKey": "selector.refresh"
        },
        {
          "action": "broadcast",
          "actionKey": "footer.selectorMode"
        }
      ]
    }
```

#### Other Designs Use Watchers On Data

This muticast plus state store design for component to component communication also avoids a common disadvantage of other designs.

Most other designs rely on one or more *watchers* on the shared data.
A *watcher* essentially binds an event handler to a mechanism that fires an event whenever the data changes.

This might sound great, but it comes with a big performance cost. Lots of watchers,
in a large scale application, can slow the performance down to point of being unacceptable.

Of course, it only gets worse as the size of the application and the number of watchers increases.

##### Performance Is Increased Without Watchers

Our design avoids a common Angular pitfall, since there are **no watchers on data**.

Since this design does not use any watchers on data,
there is no negative impact on performance.

This is especially important for very large scale complex apps,
with a large number of components.

#### Requires Less Coding

This design for communication between components only requires
about two lines of simple code in your component's TS file.

```
this.xxxStateStoreService.putItem('searchText', this.searchText);
this.xxxEventMgrService.handleEvent('searchBox.search');
```

And it requires no coding in your component's HTML template file. 

Less coding means large projects can be completed in less time.

#### Code Is Easy To Read and Understand

Techniques like Angular's *Input* and *Output* requires code that is not easy to read or understand.

But our design requires code that is simple and easy to read and understand.

```
this.searchText = this.xxxStateStoreService.getItem('searchText');
```
And you don't have to go and look at the template file to see what is going on.

#### Enables Lightweight Components

Since we are letting our library services handle most of the logic and to do most of
the work, we end up with very lightweight components.

Lightweight components is one of the goals in an efficient large scale app.

#### Works With Both Services and Components

Angular's *Input* and *Ouput* only works with components.

But our same design for communicating data and events can be used equally well between services or components.

It serves to link:
* Component to Component
* Component to Service
* Service to Component
* Service to Service

#### Facilitates Portability And Reusability

The library components are designed for reuse in any other Angular application.

And if you use this method of handling events and storing and retrieving data, 
you can freely copy and reuse your components.

#### Communication Is Decoupled From DOM Structure

Since this design for communication between components does not rely on any particular DOM structure,
it makes it much easier to setup.

You are free to put you components at any location in the DOM.

And more importantly, it makes it much easier to make changes to you application in the future.
Changing the order or location of any component in the DOM will never impact how they communicate.

#### Easier To Debug

This design is easy to debug.

The centralized *event manager* gives you a single place
where you can keep track of all your events.

The centralized *state store service* gives you a single place where you can
examine all of your data or application state at any given point in time.

#### Decouples Data And Application State From All Services and Components

The *state store service* does more than enable an effective way to pass data
from one component or service to another.

It also completely separates both the data and the state from any service or component.

#### State Can Be Preserved And Restored

The *state store service* gives you a single point where all of the application state is located.

You can accurately preserve the application state whenever you need.

And you can accurately restore the application state whenever you need.

## Responsive Design

The size of all of the displayed elements are automatically scaled to the appropriate size according to the size and orientation of the users device, to optimize the displayed information for mobile phones, tablets, or larger screens. 

### Body Font Size Controls Global Rem Sizes

We can set a coding standard that all CSS sizes should use *rem* units (relative 'M" size) units 
instead of *px* (pixels).

For example, all heights, widths, margins, and font sizes should use a *rem* measurement.

The *rem* unit is calculated as 1/16th of the `<body> font-size`.

This allows us to control all CSS sizes to be scaled in one place. 
We simply can change the `<body> font-size`, and all of our HTML elements that have a size specified in *rem* units will automatically be scaled larger or smaller exactly according to the `<body> font-size`.

This means that all of our font sizes, margins, and container widths and heights will all be accordingly scaled.

Now we can use CSS media queries to set the `<body> font-size`.

It gives us an easy way to make the application elements responsive to the users screen size.

#### CSS Media Queries

Media queries can be used to check many things, such as:

* width and height of the viewport
* width and height of the device
* orientation (is the tablet/phone in landscape or portrait mode)
* resolution

For more information on CSS media queries, look it up on the web.

##### SASS Partial Files For Media Queries

In this application, we use SASS (.scss) partial files to contain all of our media queries.

The base CSS file is `styles.scss`. 
In this file we import the other files that contain the responsive media queries.
```scss
/* responsive css */
@import "partials/media-variables";
@import "partials/media-phones";
@import "partials/media-tablets";
@import "partials/media-pcs";

```
In the `media-variables.scss` file, we set the variables for the `<body> font-size`.
```scss
/* variables used for all media scss */
$body-font-size-xs: 13px;
$body-font-size-sm: 14px;
$body-font-size-md: 15px;
$body-font-size-lg: 16px;
$body-font-size-xl: 17px;
```
These variables are used in each of the media queries to set the `<body> font-size` for each screen size.

### Scalable Images Are Responsive

For the best user experience in a responsive app, all images should be scalable.

#### Images Should Be SVG Whenever Possible

*SVG* (Scalable Vector Graphics) is the best image format for a responsive view.
Like the name indicates, *SVG* is designed to be scaleable.
This means there is no loss of image quality when the scale is changed
to any size, no matter how large or small.

*SVG* is suitable for mostly graphical images,
such as those used for logos and icons.

##### Setting Image Scale In CSS

In this example app, for the main logo in the header,
we set the image size in the CSS as a percentage of the window size.

###### Using View Width in CSS

**xxx-header-component.scss**
```scss
.xxx-header-logo {
  width: 13vw;
  max-width: 4rem;
  min-width: 3rem;
}
```
In this case, the image width is set to 13% of the current window width.

###### Setting Image Min and Max Size

Also we want to insure the image will not get too small or too big as it scales.
So we set the minimum and maximum width as well.

These sizes use the *rem* units, since our standard is use *rem*
for all size settings. See [Body Font Size Controls Global Rem Sizes](#body-font-size-controls-global-rem-sizes).

## Angular Best Practices

### Naming Conventions

A *Best Practice* is to use unique namespace rules for the following categories:
* Angular Class Names
* CSS Class Names
* HTML Element Names
* HTML Element Ids
* HTTP Header Names

#### Angular Class Names

Angular class names are public within the application namespace, so it is important to avoid class name collisions with any potential current or future class that is introduced. Since we may not have control, or even knowledge of what names may be possibly used by 3rd party vendor software, it is a best practice to use an unusual prefix at the beginning of all of your class names.

Each class name, for example `XxxDataService` should have a 3 or 4 letter prefix, that will insure the class name is unique within the whole application namespace.

A good rule for choosing a unique prefix is to take the first 4 consonants of your company name or project name.

For example, if you are doing a project for *Verizon*, the prefix can be *Vrzn*, and the class name for the `DataService` would be `VrznDataService`.

There is an additional benefit for using a consistent unique prefix. It makes it easy to recognize all your classes (for example `VrznSearchBox`) as you are looking through lots of code or many lines of html.

#### CSS Class Names

All CSS class names, for example `header-title` should have a 3 or 4 letter prefix, that will insure the class name is unique within the whole application namespace.

So the correct CSS class name to use would be `xxx-header-title`.

### Organize Components Or Services With Modules

A best practice for large scale applications is to organize components and services by modules.

#### Create A Directory For Each Module

Create a directory for each module.

Each module directory contains all of the files required for one feature.
Each feature is fine-grained.
In other words, we divide features into the smallest possible group.

#### Create A Module For Each Component

A good rule to follow is to create a module for each component.

##### Export The Component In Its Own Module

In the module for the component, declare and export the component.

This makes the component available to any other parent component which imports that module.

##### Example Component Module

Here is an example of a module that contains a component:
```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {XxxGizmoComponent} from './xxx-gizmo.component';

@NgModule({
  declarations: [XxxGizmoComponent],
  exports: [XxxGizmoComponent],
  imports: [BrowserModule]
})
```
The component is imported, declared, and exported in the component module.

To use this component in a parent component,
simply import this module into the module of the parent component. 

##### Example Parent Component Module Using The Component

Here is an example of the code used in a parent component module to import the component.
```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {XxxGizmoModule} from './xxx-gizmo.module';

import {XxxParentComponent} from './xxx-parent.component';

@NgModule({
  declarations: [XxxParentComponent],
  exports: [XxxParentComponent],
  imports: [
    BrowserModule,
    XxxGizmoModule
  ]
})
```

#### Create A Module For Each Service

A good rule to follow is to create a module for each service.

This insures that any dependencies for the service are included and made
available to any other parent component which imports that module.

##### Example Service Module

Here is an example of a module that contains a service:
```
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {XxxDataModule} from '../xxx-data/xxx-data.module';
import {XxxMessageModule} from '../xxx-message/xxx-message.module';
import {XxxStateStoreModule} from '../xxx-state-store/xxx-state-store.module';

@NgModule({
  imports: [
    RouterModule,
    XxxDataModule,
    XxxMessageModule,
    XxxStateStoreModule
  ]
})

export class XxxEventMgrModule {
}
```

To use this service in a parent component,
simply import this module into the module of the parent component.

##### Example Parent Component Module Using The Service

Here is an example of the code used in a parent component module to import the service.
```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {XxxStateStoreModule} from '../../xxx-library/xxx-state-store/xxx-state-store.module';

import {XxxGizmoComponent} from './xxx-gizmo.component';

@NgModule({
  declarations: [XxxGizmoComponent],
  exports: [XxxGizmoComponent],
  imports: [
    BrowserModule,
    XxxStateStoreModule
  ]
})
```
Notice that we don't have a `providers` section in the parent component module to provide the service.
That is because the service is provided either by the service module, or else by the ``providedIn`` in the service itself.

You should **not** include the service in the `providers` section of any other module or component.

##### When Not To Create A Module For A Service

The normal rule is to create a module for each service.
But the exception to the rule is:

*If a service is used only for a single component,
then include that service into the module for that component.*

In that case, put the service file into the directory for the component.

##### Services Imported By A Service Module Have Global Scope

Since services imported and provided at the module level have application scope,
that service will also be available everywhere in the application.

##### Services Provided By Any Module Are Singletons

If the service uses the ``providedIn`` property in the service itself, it is a singleton.

Services included in the `providers` section of any module are singletons.

This means that the service is only instantiated once, and is only destroyed when the application is closed.

Any properties contained in the service will remain unchanged and are available to any user of the service.
 
##### A Service Module Provides Its Dependencies

A best practice is to create a module for each service.

Include all the dependencies for the service in its module.

Any consumer of the service should import the service module in its own module.

This insures that the consumer of the service will have all the dependencies.

You can import the service module more than once.

In fact, the best practice is to import the service module into each parent consumer.

So let's take the example of the `XxxDataService` used in this app.

The `XxxDataService` does the XHR data request for all the calls to the StackExchange API server.

It is a reusable library service, so we can use this service in any other application,
and it can be used in many places, anywhere we are doing an XHR request.

We know that the first time a service is instantiated by a consumer in the normal way,
which is to import the service module, it becomes available to the entire application.

But the best practice is to import things at the lowest level.
So you should only import the service module by the parent consumer module.

But what if you are using the service in many different components?

That's fine. Just import the service module in each parent module.
Even if the service module uses the ``providers`` array, the service will remain a singleton.

The Angular compiler recognizes that the service is already available,
and will ignore the repeated providers statements.

In other words, Angular is "smart enough" not to reinstantiate a singleton service,
no matter how many times we import the service module.

The reason why this is a best practice is, when later refactoring the app,
we don't need to search around to find the required service for a given component.

We can easily just add or remove the component module,
and the required service is added or removed at the same time.

##### A Service Provided At Component Level Is Not A Singleton

*If you want to have a service that can have multiple or unique instantiations,
then do not import the service at the module level.*

In this case, do not use a module that contains the service.

Instead, you must import the service into a component, as usual,
but now you must *include the service in the 'providers' section of the component.*

#### Dont Group Things By Class Type

**Do not** group things by Angular class type.

We sometimes see a directory structure by class type:
```text
/Components
/Services
/Interfaces
/Models
/Pipes
```
This is a bad idea for large scale projects.

One reason why is because when you decide to share code between projects, you will likely need to sort though each directory, and take only some of the files, and not take others. 
This becomes a messy and confusing process.

Another reason why is let's say you want only one of the functional features. 
Now you will need to go look into several directories and take a component from one, and take a service from another, and take a model from yet another, and take an interface from yet another. 

Now if you have also made each folder into a module, you will need to rewrite the module files for all of those. 

The same problem happens if you decide to remove a feature from an existing project. 
You will need to hunt all over the place for the associated files that are now scattered into many different directories. 

And you will need to rewrite many module files. 

#### Do Group By Feature Using Module

In this example, each component or service is assigned to its own module. We first create a directory using the name that will be used.

##### Example Module For The Gizmo Feature

For example, we have a *gizmo* component, model, service, and some other stuff. 
So we create a directory named *xxx-gizmo*. Notice that the directory name is "snake-case", which is all lower case, separated by hyphens.

Next, we put all of the files directly associated with this component into this directory.

```
/xxx-gizmo
   xxx-gizmo.actions.ts
   xxx-gizmo.component.html
   xxx-gizmo.component.scss
   xxx-gizmo.component.spec.ts
   xxx-gizmo.effects.ts
   xxx-gizmo.component.ts
   xxx-gizmo.interface.ts
   xxx-gizmo.model.ts
   xxx-gizmo.module.ts
   xxx-gizmo.reducer.ts
   xxx-gizmo.service.ts
   xxx-gizmo.state.ts
```

Finally we create a module file that will be used to encapsulate this component.

```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {XxxGizmoComponent} from './xxx-gizmo.component';

@NgModule({
  declarations: [XxxGizmoComponent],
  exports: [XxxGizmComponent],
  imports: [BrowserModule],
  providers: [XxxGizmoService]
})
export class XxxGizmoModule {}
```

In the module file, we export the component. So now any other module that needs to use this component can just import this module, and we don't need to declare or export the component anywhere else.

Or, in the case of a service, we include the service in the `providers` section.
So now that service is available to the whole application after being imported by any other module.

##### Refactoring The Gizmo Feature Is Easy

Now when we decide later to remove the *gizmo* feature from the app, we can just delete that one directory,
and delete that single import from the parent module. 

Or if we need to add the *gizmo* feature to another app, we just copy that one directory, 
and add a single import to the parent module.

#### Import Modules At The Lowest Level

One more best practice is to import things at the lowest possible level.
 
In other words, **do not** *import things at the* **app** *module level.*
Instead, import things at the level where they used.

In this example, we need to use the `XxxSearchBox` in the `XxxHeader` component.
So we import the `XxxSearchBoxModule` in the `XxxHeaderModule`.

A good rule of thumb is to look first at the HTML template file for a given component. You can see what components are used there.
And if you have organized each of your components into modules, you can import the module for each of the required components into that module.

##### Header Module Uses Lowest Imports

Here is the module for the `XxxHeader` component:

```
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {XxxHeaderComponent} from './xxx-header.component';
import {XxxSearchBoxModule} from '../xxx-search-box/xxx-search-box.module';

@NgModule({
  declarations: [XxxHeaderComponent],
  exports: [XxxHeaderComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatToolbarModule,
    XxxSearchBoxModule
  ]
})

export class XxxHeaderModule {
}
```

You see here we import all of the required components at this lowest level.

##### Search Box Module Uses Lowest Imports

```
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {NgModule} from '@angular/core';

import {XxxMessageModule} from '../../xxx-library/xxx-message/xxx-message.module';
import {XxxSearchBoxComponent} from './xxx-search-box.component';
import {XxxStateStoreModule} from '../../xxx-library/xxx-state-store/xxx-state-store.module';

@NgModule({
  declarations: [XxxSearchBoxComponent],
  exports: [XxxSearchBoxComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    XxxMessageModule,
    XxxStateStoreModule
  ]
})

export class XxxSearchBoxModule {
}
```

##### Wrong Way Has Imports At App Module

By comparison, we could have tried to import everything at the app module level like this:

```
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {XxxAlertComponent} from './xxx-library/xxx-alert/xxx-alert.component';
import {XxxAlertService} from './xxx-library/xxx-alert/xxx-alert.service';
import {XxxDataService} from './xxx-library/xxx-data/xxx-data.service';
import {XxxHeaderComponent} from './modules/xxx-header/xxx-header.component';
import {XxxMessageService} from './xxx-library/xxx-message/xxx-message.service';
import {XxxSearchBoxComponent} from './modules/xxx-search-box/xxx-search-box.component';
import {XxxStackExchangeQuestionsComponent} from './modules/xxx-stack-exchange-search/xxx-stack-exchange-search.component';
import {XxxStateStoreService} from '../../xxx-library/xxx-state-store/xxx-state-store.service';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    XxxAlertComponent,
    XxxHeaderComponent,
    XxxStackExchangeQuestionsComponent
  ],
  exports: [
    XxxAlertComponent,
    XxxHeaderComponent,
    XxxStackExchangeQuestionsComponent  
  ],    
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    XxxAlertService,
    XxxDataService,
    XxxMessageService,
    XxxStateStoreService  
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

This will work. Since components can be exported and then used at lower levels. 
And services can be included in the `providers` section, and then can be used anywhere else in the app.

But this is not the best way to do your imports.

It makes the app harder to do refactoring, since you are really not sure of which
components or services have which dependencies.

##### Tutorials Train The Wrong Way

You will often see app module imports being done in tutorials and example applications. 
But this is infortunate, since newcomers are being trained to do things the *wrong way*. 

##### Large Scale Projects Lead To The Better Way

It may take years of experience, working on larger teams, 
and doing refactoring on large scale projects, 
before the developer learns that the practice of *app module level imports*  is wrong.

The better way is to create a module for each component or service,
and include all of its own dependencies.

Don't "leap frog" the dependency chain.
In other words don't import any dependencies that are required by a child, lower children.
 
If you follow this practice of organizing each component into its own module, 
and then importing the required modules at the lowest level, 
only where they are actually required, 
then it makes it easier to restructure the application.

In this example, if we decide to remove the `XxxSearchBox` component from the `XxxHeader` component template, 
we know we can simply also delete it from that module, 
and we don't need to worry about searching all over the application to see where else we may have imported it.

##### Example Where To Import FormsModule

In this last code example, we import the `FormsModule` at the app module level. But, go look at the app.component.html template file...

You will see that we don't use any forms there. So don't import things at the higher level!

Remember to wait until the last possible place to do the import.
 
So in this case, we use a form in the `xxx-search-box` component.
So we import the `FormsModule` in the `XxxSearchBoxModule` instead. 

##### Its Ok To Import Things Twice

One more thing about organizing things into modules, 
and importing things at the lowest level:

Don't worry about importing things twice in different places. 
This will happen when we use the same thing in 2 different places. 

For example, in the case of a service, 
Angular is smart enough not to 're-import' it, 
so importing a module once at the app module level is the same as importing that module many times at all the lower levels.
 
This means it will be just as efficient to the compiler to use this strategy of importing things at each of the required levels, and not worrying about duplicating imports anywhere in the application.

In other words, there is no advantage of importing things once at the app.module level.
In fact, this becomes a disadvantage when application restructuring is required.

##### Ng Generate Adds Component To App Module

If you use `ng generate component my-component`,
it will automatically add the import and declaration to the *app module* for your new component.

But we should generally not import and declare components at the *app module level*.
Instead, we should create a module for each component, and import the component, declare and then export it.
 
###### Remove Generated Component From App Module

If you use `ng generate component`, then you will need to remove all its references from the app module.

---
