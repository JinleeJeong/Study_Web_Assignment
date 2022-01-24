import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Table, Button, Input, DatePicker, Form, InputNumber, Popconfirm, message} from 'antd';
import {Link} from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import axios from 'axios'
moment.defaultFormat = "YYYY/M/D HH:mm";

var momentTimezone = require('moment-timezone');
momentTimezone().tz("Asia/Seoul").format();
// -----------------------Layout
const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu;
const {RangePicker} = DatePicker;
// -----------------------Layout

// ----- Editer Func
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
// ----- Editer Func

class board extends Component {
    constructor(props) {
      super(props);

      this.state = {
        collapsed: false,
        searchText: '',
        startTime: '',
        endTime: '',
        users : [],
        data : [],
        selectedRowKeys : [],
        created : []
      }
      
      this.onOk = this.onOk.bind(this);
      this.onChange = this.onChange.bind(this);
      this.delete = this.delete.bind(this);
      this.confirmLogout = this.confirmLogout.bind(this);
      this.cancelLogout = this.cancelLogout.bind(this);


      this.columns = [
          {
            title: '이름',
            dataIndex: 'Name',
            key: 'Name',
            width: '20%',
            editable: true,
            ...this.getColumnSearchProps('Name'),
            sorter: (a,b) => this.compStringReverse(a.Name, b.Name),
            defaultSortOrder: 'ascend',
          }, 
          
          {
            title: '앱 번호',
            dataIndex: 'App',
            width: '20%',
            editable: true,
            key: 'App',
            ...this.getColumnSearchProps('App'),
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.App - b.App,
          }, 
            
          {
              title: '사용량',
              dataIndex: 'created_at',
              width: '30%',
              editable: true,
              key: 'created_at',
              ...this.getColumnSearchProps('App'),
              sorter: (a, b) => a.created_at - b.created_at,
              sortDirections: ['descend', 'ascend'],
          },   
              
        // -----------------------------Operation
        {
          title: '수정',
          dataIndex: 'operation',
          render: (text, record) => {
            
            const editable = this.isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      
                      {form => (
                        <Popconfirm
                          title="Sure to save??"
                          onConfirm={() => this.save(form, record.key)}
                        >
                          <a
                            href="localhost:3000"
                            style={{ marginRight: 8 , float : "left"}}
                          >
                            저장
                          </a>
                        </Popconfirm>
                      )}
                    </EditableContext.Consumer>
                    
                    <div stlye= {{float : "left"}}onClick={() => this.cancel(record.key)} >
                      취소
                    </div>
                  </span>
                ) 
                
                : (
                  <a href = "localhost:3000" onClick={() => this.edit(record.key)}>편집</a>
                )}
              </div>
            );
          },
        },
        // -----------------------------Operation
      ];

      
    }
    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
      this.setState({ editingKey: '' });
    };
    saveaction = () => {
      console.log("saveAction");
    };


    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.users];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ users: newData, editingKey: '' });
        } else {
          newData.push(row);
          this.setState({ users: newData, editingKey: '' });
        }
      });
    }
    edit(key) {
      this.setState({ editingKey: key });
    }
    // ---------------------------------Edit Result or Change State
    componentDidMount(){
      axios.get('http://localhost:8080/api/users')
      .then(res => {
        this.setState({
          users : res.data,
        }, () => {
          })
        });
  }

      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
    // collapsed : SideBar True || False

    onChange = (value, dateString) => {
      // console.log('Selected Time: ', value);
      // console.log('Formatted Selected Time: ', dateString);
    }
    
    onOk = (value) => {
      var a = new Date(value[0]).getTime();
      var b = new Date(value[1]).getTime();
      // getTime Function : Date > milliseconds
      if(a!== b){
      
      this.setState({
        startTime : value[0],
        endTime : value[1]
      }, function() {
        var firstDate = moment(this.state.startTime._d, 'YYYY/M/D HH:mm')
        var finishDate = moment(this.state.endTime._d, 'YYYY/M/D HH:mm')
        var dates = [];
        firstDate = firstDate.format('YYYY/M/D HH:mm');
        finishDate = finishDate.format('YYYY/M/D HH:mm');
        dates.push(firstDate);
        dates.push(finishDate);

        this.setState({
          data : dates,
        }, () => {
          console.log(this.state.data);
        })
            // ------------------------------------------------data setState
        var numbers = [];

          numbers = this.state.users.map(test => test.created_at);;
          for( let i = 0 ;i < this.state.users.length ; i++){
            numbers[i] = moment(numbers[i], "YYYY-M-D HH:mm").format();
            if(moment(numbers[i]).isBetween(moment(firstDate), moment(finishDate), 'minutes', true)){
              console.log("success");
              this.setState({
                users : this.state.users.filter(users => users.created_at !== moment(users.created_at).isBetween(moment(firstDate), moment(finishDate), 'minutes', true))
              })
            }
            else {
              console.log('else')
            }
          }
          // users information
        });
      }
      else (
        alert('중복된 시간입니다.')
      )

      
      
}


    // -------------------table
      getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),

        
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })
    
      

      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
    
      // -------------------table

      logout = () => {
        console.log("logout");

      }
      onChangePicker = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter);
      }
      
      compStringReverse = (a,b) => {
        if(a > b) return -1;
        if(b > a) return 1;
        return 0;
      }

      confirmLogout = (e) =>{
        this.props.history.push('/');
    };
      
      cancelLogout = (e) => {
        console.log(e);
        message.error('Click on No');
      }
      
      delete = (e) => {
        e.preventDefault();
        this.setState({

          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[0]),
        }, () => {
          if(this.state.selectedRowKeys[1] !== '')
          {
            this.setState({
              users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[1]),
            }, () => {
              if(this.state.selectedRowKeys[2] !== '')
              {
                this.setState({
                  users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[2]),
                }, () => {
                  if(this.state.selectedRowKeys[3] !== '')
                  {
                    this.setState({
                      users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[3]),
                    }, () => {
                      if(this.state.selectedRowKeys[4] !== '')
                      {
                        this.setState({
                          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[4]),
                        }, () => {
                          if(this.state.selectedRowKeys[5] !== '')
                          {
                            this.setState({
                              users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[5]),
                            }, () => {
                              if(this.state.selectedRowKeys[6] !== '')
                              {
                                this.setState({
                                  users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[6]),
                                }, () => {
                                  if(this.state.selectedRowKeys[7] !== '')
                                  {
                                    this.setState({
                                      users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[7]),
                                    }, () => {
                                      if(this.state.selectedRowKeys[8] !== ''){
                                        this.setState({
                                          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[8]),
                                        }, () => {
                                          if(this.state.selectedRowKeys[9] !== '') {
                                            this.setState({
                                              users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[9]),
                                            }, () => {
                                              if(this.state.selectedRowKeys[10] !== '') {
                                                this.setState({
                                                  users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[10]),
                                                }, () => {
                                                  if(this.state.selectedRowKeys[11] !== '') {
                                                    this.setState({
                                                      users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[11]),
                                                    }, () => {
                                                      if(this.state.selectedRowKeys[12] !== '') {
                                                        this.setState({
                                                          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[12]),
                                                        }, () => {
                                                          if(this.state.selectedRowKeys[13] !== '') {
                                                            this.setState({
                                                              users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[13]),
                                                            }, () => {
                                                              if(this.state.selectedRowKeys[14] !== '') {
                                                                this.setState({
                                                                  users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[14]),
                                                                }, () => {
                                                                  if(this.state.selectedRowKeys[15] !== '') {
                                                                    this.setState({
                                                                      users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[15]),
                                                                    }, () => {
                                                                      if(this.state.selectedRowKeys[16] !== '') {
                                                                        this.setState({
                                                                          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[16]),
                                                                        }, () => {
                                                                          if(this.state.selectedRowKeys[17] !== '') {
                                                                            this.setState({
                                                                              users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[17]),
                                                                            }, () => {
                                                                              if(this.state.selectedRowKeys[18] !== '') {
                                                                                this.setState({
                                                                                  users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[18]),
                                                                                }, () => {
                                                                                  if(this.state.selectedRowKeys[19] !== '') {
                                                                                    this.setState({
                                                                                      users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[19]),
                                                                                    }, () => {
                                                                                      if(this.state.selectedRowKeys[20] !== '') {
                                                                                        this.setState({
                                                                                          users : this.state.users.filter(users => users.key !== this.state.selectedRowKeys[20]),
                                                                                        })
                                                                                      }
                                                                                    })
                                                                                  }
                                                                                })
                                                                              }
                                                                            })
                                                                          }
                                                                        })
                                                                      }
                                                                    })
                                                                  }
                                                                })
                                                              }
                                                            })
                                                          }
                                                        })
                                                      }
                                                    })
                                                  }
                                                })
                                              }
                                            })
                                          }
                                        })
                                      }
                                    })
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        });
        var key = []
        key = this.state.selectedRowKeys;
        axios.delete(`http://localhost:8080/api/users/delete/${key}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }
      
      
      render() {
        // console.log(this.state.users);
        const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
        };
        const columns = this.columns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: record => ({
              record,
              inputType: col.dataIndex === 'App' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: this.isEditing(record),
            }),
          };
        });

        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            this.setState({
              selectedRowKeys : selectedRowKeys
            }, () => {
              console.log(this.state.selectedRowKeys);
            })
          } 
            
          // getCheckboxProps: record => ({
          //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
          //   name: record.name,
          // }),
        };

        console.log(this.state.data);
        console.log(this.state.users);
        const hasSelected = this.state.selectedRowKeys.length > 0;
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              collapsible 
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="App-logo" />
              <Menu theme="dark" defaultSelectedKeys={['5']} mode="inline" style={{maxHeight:"898px"}}>

                <Menu.Item key = "1" style= {{marginTop: '32%'}}>
                    <Icon type="pie-chart" /> <span>대시보드</span>
                    <Link to = {`/main`}/>  
                </Menu.Item>  

                <SubMenu
                  key="sub1"
                  title={<span><Icon type="team" /><span>설정</span></span>}
                >
                  <Menu.Item key="2">사용 금지 목록</Menu.Item>
                  <Menu.Item key="3">타 인강 목록 설정</Menu.Item>
                  <Menu.Item key="4">앱 업데이트 설정</Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub2"
                  title={<span><Icon type="user" /><span>사용 이력 조회</span></span>}
                >
                  <Menu.Item key="5"><Link to = {`/board`}/>앱별</Menu.Item>
                  <Menu.Item key="6"><Link to = {`/ingang`}/>인강별</Menu.Item>
                  <Menu.Item key="7"><Link to = {`/app`}/>학생별</Menu.Item>
                </SubMenu>

                  <Menu.Item key = "8" onClick={this.logout} style={{position:"fixed", bottom:"5vh", zIndex:"10000", width: "15%"}}>
                    <Icon type="logout"/>
                    
                    <Popconfirm title = "로그아웃 하시겠습니까?" onConfirm={this.confirmLogout} onCancel={this.cancelLogout} okText="Yes" cancelText="No">
                        <span>로그아웃</span> 
                        <Link to = {`/`}/>                  
                    </Popconfirm>

                  </Menu.Item>
              </Menu>
            </Sider>


            <Layout>
              <Header style={{ background: '#1DA57A', padding: 0 }} >
                <Breadcrumb style={{ margin: '12px 0'}}>
                  <Breadcrumb.Item><h1 style={{color : 'white' , marginLeft : "3vh", fontWeight :"bolder", fontSize : "3.2vh"}}>사용 이력 조회</h1></Breadcrumb.Item>
                </Breadcrumb>
              </Header>


              <Content style={{ margin: '2vh 30px' }}>
                <div>
                  
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['Start Time', 'End Time']}
                    onChange={this.onChangePicker}
                    onOk={this.onOk}
                    style={{margin : '1% 0 1% 0'}}
                  />
                </div>

                <div style={{ padding: 11, background: '#fff', minHeight: 360, clear:'both', marginBottom: '1%'}}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.users}
                    columns={columns}
                    rowSelection={rowSelection}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: this.cancel,
                    }}
                    onChange = {this.onChange}
                     rowkey={record => record.uid}
                  />
                </div>
                <div style={{float:"right"}}>
                  <Button type="primary" onClick ={this.delete} value={this.state.users.key} disabled={!hasSelected}>삭제</Button>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center', color :"white", backgroundColor : "#1DA57A", padding :"1.5vh", height: "5.1vh"}}>
                TechNonia Design ©2018 Created by J
              </Footer>
            </Layout>
          </Layout>
    
        );
      }
    }
    

export default board;
