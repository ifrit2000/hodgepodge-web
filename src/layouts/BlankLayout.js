import React from 'react';
import memoizeOne from "memoize-one";
import isEqual from "lodash/isEqual";

// export default (props) => <div {...props} />;

class BlankLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);

  }

  render() {
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default BlankLayout;
