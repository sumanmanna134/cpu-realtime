resource "aws_security_group" "my_instance_sg" {
    name_prefix = "dele-"
    tags = {
      Name = "my-security-group"
    }
  
}
// port 80
resource "aws_security_group_rule" "http_inbound" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.my_instance_sg.id
  
}

//port 22
resource "aws_security_group_rule" "ssh_inbound" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.my_instance_sg.id
  
}

resource "aws_security_group_rule" "app_inbound" {
    type = "ingress"
    from_port = 5000
    to_port = 5000
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    security_group_id = aws_security_group.my_instance_sg.id
  
}