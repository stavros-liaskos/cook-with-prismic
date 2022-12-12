import React from 'react';
import { Elements } from 'prismic-richtext';

// -- Function to add unique key to props
const propsWithUniqueKey = function (props: any, key: any) {
  return Object.assign(props || {}, { key });
};

/**
 * https://prismic.io/docs/technologies/html-serializer-reactjs
 * HTML Serializer
 * This function will be used to change the way the HTML is loaded
 */
const htmlSerializer = function (type: any, _element: any, _content: any, children: any, key: any) {
  var props = {};

  switch (type) {
    case Elements.list:
      props = { className: 'list-disc list-inside  mb-6' };
      return React.createElement('ul', propsWithUniqueKey(props, key), children);

    case Elements.oList:
      props = { className: 'list-decimal list-inside  mb-6' };
      return React.createElement('ol', propsWithUniqueKey(props, key), children);

    case Elements.listItem:
      props = { className: 'ml-4' };
      return React.createElement('li', propsWithUniqueKey(props, key), children);

    case Elements.oListItem:
      props = { className: 'ml-4' };
      return React.createElement('li', propsWithUniqueKey(props, key), children);

    case Elements.heading1:
      props = { className: 'text-7xl mb-6' };
      return React.createElement('h1', propsWithUniqueKey(props, key), children);

    // Return null to stick with the default behavior
    default:
      return null;
  }
};

export default htmlSerializer;
